# app/schemas/user_store_schema.py
from pydantic import BaseModel

class UserStoreCreate(BaseModel):
    user_id: str
    product_id: str

class UserStoreOut(BaseModel):
    id: int
    user_id: str
    name: str
    product_id: str
    category: str
    type: str

    class Config:
        from_attributes = True