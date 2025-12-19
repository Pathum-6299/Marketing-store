import uuid
import os
import logging
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.campaign_model import Campaign
from app.schemas.campaign_schema import (
    CampaignCreate,
    CampaignUpdate,
    CampaignOut
)
os.makedirs("logs", exist_ok=True)

logger = logging.getLogger("campaign_logger")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("logs/campaign.log")
formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)
router = APIRouter(prefix="/campaigns", tags=["Campaigns"])


def generate_campaign_id():
    return f"CAMP-{uuid.uuid4().hex[:8].upper()}"


@router.post("", response_model=CampaignOut)
def create_campaign(payload: CampaignCreate, db: Session = Depends(get_db)):
    try:
        campaign = Campaign(
            campaign_id=generate_campaign_id(),
            title=payload.title,
            description=payload.description,
            platforms=payload.platforms,
            images=payload.images,
            active=payload.active
        )

        db.add(campaign)
        db.commit()
        db.refresh(campaign)

        return campaign

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.get("", response_model=list[CampaignOut])
def get_all_campaigns(db: Session = Depends(get_db)):
    return (
        db.query(Campaign)
        .order_by(Campaign.created_at.desc())
        .all()
    )


@router.put("/{campaign_id}", response_model=CampaignOut)
def update_campaign(
    campaign_id: str,
    payload: CampaignUpdate,
    db: Session = Depends(get_db)
):
    campaign = db.query(Campaign).filter(
        Campaign.campaign_id == campaign_id
    ).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    for key, value in payload.dict(exclude_unset=True).items():
        setattr(campaign, key, value)

    db.commit()
    db.refresh(campaign)

    return campaign


@router.delete("/{campaign_id}")
def delete_campaign(campaign_id: str, db: Session = Depends(get_db)):
    campaign = db.query(Campaign).filter(
        Campaign.campaign_id == campaign_id
    ).first()

    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")

    db.delete(campaign)
    db.commit()

    return {"message": "Campaign deleted successfully"}
