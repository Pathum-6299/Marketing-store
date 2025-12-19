from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class CampaignBase(BaseModel):
    title: str
    description: Optional[str] = None
    platforms: Optional[List[str]] = []
    images: Optional[List[str]] = []
    active: bool = True


class CampaignCreate(CampaignBase):
    pass


class CampaignUpdate(CampaignBase):
    active: Optional[bool] = None


class CampaignOut(CampaignBase):
    campaign_id: str
    created_at: datetime

    class Config:
        from_attributes = True
