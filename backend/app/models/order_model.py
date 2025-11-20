from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, nullable=False)
    quantity = Column(Integer, nullable=False)
    total_price = Column(Float, nullable=False)
    status = Column(String(50), default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)

    # ✅ Relationship to BillingDetails
    billing_details = relationship("BillingDetails", back_populates="order", uselist=False)


class BillingDetails(Base):
    __tablename__ = "billing_details"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    name = Column(String(255))
    email = Column(String(255))
    phone = Column(String(50))
    address = Column(String(255))
    city = Column(String(100))
    zip_code = Column(String(20))
    country = Column(String(100))
    created_at = Column(DateTime, default=datetime.utcnow)

    # ✅ Relationship back to Order
    order = relationship("Order", back_populates="billing_details")
