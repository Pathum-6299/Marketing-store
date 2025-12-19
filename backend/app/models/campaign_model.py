from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.db import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    # specify lengths for String to be compatible with MySQL VARCHAR
    campaign_id = Column(String(32), unique=True, index=True, nullable=False)

    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)

    # use JSON for platform and image lists for cross-dialect compatibility
    platforms = Column(JSON, nullable=True)
    images = Column(JSON, nullable=True)

    active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
