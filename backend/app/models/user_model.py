# app/models/user_model.py
from sqlalchemy import Column, Integer, String, Boolean
from app.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    mobile_no = Column(String(15), unique=True, nullable=False)
    username = Column(String(50), nullable=False)
    email = Column(String(100), nullable=True)  # optional now
    hashed_password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)
    otp = Column(String(6), nullable=True)  # ✅ NEW COLUMN

    referral_code = Column(String(20), unique=True, nullable=False)
    referred_by = Column(String(20), nullable=True)  # referral_code of referrer
    points = Column(Integer, default=0)
