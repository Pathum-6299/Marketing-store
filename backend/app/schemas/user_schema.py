# app/schemas/user_schema.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    mobile_no: str = Field(..., min_length=10, max_length=15)
    username: str
    password: str = Field(..., min_length=6, max_length=72)
    email: Optional[EmailStr] = None  # optional now
    referral_code_used: Optional[str] = None  

class UserLogin(BaseModel):
    mobile_no: str
    password: str

class UserOut(BaseModel):
    id: int
    mobile_no: str
    username: str
    email: Optional[EmailStr]
    is_admin: bool
    otp: Optional[str]

    class Config:
        orm_mode = True
