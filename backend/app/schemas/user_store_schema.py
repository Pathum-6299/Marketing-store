# app/schemas/user_store_schema.py
from pydantic import BaseModel, Field

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

class StoreCreate(BaseModel):
    store_name: str = Field(..., min_length=2)
    user_id: str
    username: str
    store_code: str

class StoreOut(BaseModel):
    store_id: str
    store_name: str
    user_id: str
    username: str
    store_code: str

    model_config = {
        "from_attributes": True
    }