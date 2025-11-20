# app/schemas/product_schema.py
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime

class SpecificationItem(BaseModel):
    label: str
    value: str

class ProductCreate(BaseModel):
    name: str
    category: str
    type: str
    description: Optional[str] = None
    features: Optional[List[str]] = []  # Add this line
    specifications: Optional[List[SpecificationItem]] = []
    images: Optional[List[str]] = []
    price: float
    actual_price: float
    points: int = 0

class ProductBasicOut(BaseModel):
    id: int
    product_id: str
    category: str
    name: str
    type: str

    class Config:
        from_attributes = True

class ProductDetailsOut(BaseModel):
    id: int
    products_id: int
    description: Optional[str]
    features: Optional[List[str]]  # Add this line
    specifications: Optional[List[Dict]]
    images: Optional[List[str]]
    price: float
    actual_price: float
    profit: float
    margin: float
    points: int

    class Config:
        from_attributes = True

class ProductOut(BaseModel):
    basic: ProductBasicOut
    details: ProductDetailsOut

