# app/utils/referral.py
import random
import string
from sqlalchemy.orm import Session
from app.models.user_model import User
from app.models.referral_model import Referral

# ------------------------------------------------------------------
# ✅ 1. Generate Referral Code
# ------------------------------------------------------------------
def generate_referral_code(username: str) -> str:
    suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    return f"{username[:3].upper()}{suffix}"


# ------------------------------------------------------------------
# ✅ 2. Apply Referral: assign points + create referral record
# ------------------------------------------------------------------
def apply_referral(db: Session, referrer_code: str, new_user_id: int):
    referrer = db.query(User).filter(User.referral_code == referrer_code).first()

    if not referrer:
        return  # invalid code: do nothing

    # ✅ Add 10 points to referrer
    referrer.points += 10
    db.add(referrer)

    # ✅ Create referral record
    referral_record = Referral(
        referrer_id=referrer.id,
        new_user_id=new_user_id
    )
    db.add(referral_record)

    db.commit()
