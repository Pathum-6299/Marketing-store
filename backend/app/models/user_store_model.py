from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class UserStore(Base):
    __tablename__ = "user_store"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), nullable=False, index=True)
    name = Column(String(100), nullable=False)
    product_id = Column(String(50), ForeignKey("product_basic.product_id"), nullable=False)
    category = Column(String(100), nullable=False)
    type = Column(String(50), nullable=False)

    product = relationship(
        "ProductBasic",
        foreign_keys=[product_id],
        primaryjoin="UserStore.product_id==ProductBasic.product_id"
    )
