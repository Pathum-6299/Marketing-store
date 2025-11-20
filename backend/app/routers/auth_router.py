# app/routers/auth_router.py
import logging, random
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.user_model import User
from app.schemas.user_schema import UserCreate, UserLogin, UserOut
from app.core.security import hash_password, verify_password, create_access_token
from app.services.referral import generate_referral_code, apply_referral

logger = logging.getLogger("auth_logger")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("logs/auth.log")
formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserOut)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    ref: Optional[str] = Query(None, alias="ref"),
):
    try:
        logger.info(f"REGISTER REQUEST: mobile={user.mobile_no} ref={ref or user.referral_code_used}")

        existing = db.query(User).filter(User.mobile_no == user.mobile_no).first()
        if existing:
            raise HTTPException(status_code=400, detail="Mobile number already registered")

        hashed = hash_password(user.password)
        random_otp = str(random.randint(100000, 999999))

        # ✅ generate referral code
        my_ref_code = generate_referral_code(user.username)

        new_user = User(
            mobile_no=user.mobile_no,
            username=user.username,
            email=user.email,
            hashed_password=hashed,
            otp=random_otp,
            referral_code=my_ref_code,
            # prefer referral code from URL (?ref=...) if provided, else use payload
            referred_by=(ref or user.referral_code_used)
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # ✅ If user used referral code (from query or payload) → reward referrer
        used_code = ref or user.referral_code_used
        if used_code:
            apply_referral(db, used_code, new_user.id)

        return new_user

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Registration failed")



@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    """Login using mobile_no + password"""
    try:
        logger.info(f"LOGIN REQUEST: mobile={user.mobile_no}")

        db_user = db.query(User).filter(User.mobile_no == user.mobile_no).first()
        if not db_user:
            logger.warning(f"LOGIN FAILED: No user for mobile {user.mobile_no}")
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not verify_password(user.password, db_user.hashed_password):
            logger.warning(f"LOGIN FAILED: Incorrect password for {user.mobile_no}")
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({"sub": db_user.mobile_no})
        logger.info(f"LOGIN SUCCESS: mobile={user.mobile_no}")

        return {
            "access_token": token,
            "token_type": "bearer",
            "username": db_user.username,
            "mobile_no": db_user.mobile_no,
            "email": db_user.email,
            "is_admin": db_user.is_admin,
            "otp": db_user.otp,
            "referral_code": db_user.referral_code
        }

    except Exception as e:
        logger.error(f"LOGIN ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")
