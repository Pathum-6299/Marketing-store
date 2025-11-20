from pydantic import BaseModel, Field
from typing import Optional

class OrderCreate(BaseModel):
    product_id: str
    quantity: int
    total_price: float

class BillingDetailsCreate(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    city: str
    zip_code: str = Field(..., alias="zipCode")
    country: str