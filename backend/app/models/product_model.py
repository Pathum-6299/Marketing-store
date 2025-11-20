# app/models/product_model.py
from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db import Base

class ProductBasic(Base):
    __tablename__ = "product_basic"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(String(50), unique=True, nullable=False, index=True)
    category = Column(String(100), nullable=False)
    name = Column(String(255), nullable=False)
    type = Column(String(100), nullable=False)

    # Relationship to ProductDetails
    details = relationship("ProductDetails", back_populates="product", cascade="all, delete-orphan")

class ProductDetails(Base):
    __tablename__ = "product_details"

    id = Column(Integer, primary_key=True, index=True)
    products_id = Column(Integer, ForeignKey("product_basic.id"), nullable=False)
    description = Column(Text, nullable=True)
    features = Column(JSON, nullable=True)  # Add this line
    specifications = Column(JSON, nullable=True)
    images = Column(JSON, nullable=True)
    price = Column(Float, nullable=False)
    actual_price = Column(Float, nullable=False)
    profit = Column(Float, nullable=False)
    margin = Column(Float, nullable=False)
    points = Column(Integer, nullable=False, default=0)

    product = relationship("ProductBasic", back_populates="details")


