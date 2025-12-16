from sqlalchemy import Column, Integer, String, ForeignKey,DateTime
from sqlalchemy.orm import relationship
from app.db import Base
from sqlalchemy.sql import func

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
class Store(Base):
    __tablename__ = "stores"

    store_id = Column(String(50), primary_key=True, index=True)
    store_name = Column(String(100), nullable=False)
    user_id = Column(String(50), nullable=False, index=True)
    username = Column(String(100), nullable=False)
    store_code = Column(String(50), unique=True, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())