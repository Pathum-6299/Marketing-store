# app/models/car_model.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class Car(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    brand = Column(String(50))
    price = Column(Float)
    status = Column(String(20), default="available")
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", backref="cars")
