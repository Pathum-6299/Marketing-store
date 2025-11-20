# app/models/referral_model.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime, func
from app.db import Base

class Referral(Base):
    __tablename__ = "referrals"

    id = Column(Integer, primary_key=True, index=True)
    referrer_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    new_user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    timestamp = Column(DateTime, server_default=func.now())
