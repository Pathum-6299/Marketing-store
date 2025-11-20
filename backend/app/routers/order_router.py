from fastapi import APIRouter, HTTPException
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload  # ✅ Added joinedload
from app.db import get_db
from app.models.order_model import BillingDetails, Order  # Your ORM models
from app.schemas.order_schema import BillingDetailsCreate, OrderCreate  # Pydantic schemas
from app.models.product_model import ProductBasic, ProductDetails
from datetime import datetime

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/create")
def create_order(
    order_data: OrderCreate,
    billing_data: BillingDetailsCreate,
    db: Session = Depends(get_db)
):
    try:
        # 1️⃣ Insert order first
        new_order = Order(
            product_id=order_data.product_id,
            quantity=order_data.quantity,
            total_price=order_data.total_price,
            status="pending",
            created_at=datetime.utcnow()
        )
        db.add(new_order)
        db.commit()
        db.refresh(new_order)

        # 2️⃣ Insert billing details linked to order
        new_billing = BillingDetails(
            order_id=new_order.id,  # link to order
            name=billing_data.name,
            email=billing_data.email,
            phone=billing_data.phone,
            address=billing_data.address,
            city=billing_data.city,
            zip_code=billing_data.zip_code,
            country=billing_data.country,
            created_at=datetime.utcnow()
        )
        db.add(new_billing)
        db.commit()
        db.refresh(new_billing)

        return {
            "order_id": new_order.id,
            "billing_id": new_billing.id,
            "message": "Order and billing details created successfully"
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/all")
def get_all_orders(db: Session = Depends(get_db)):
    try:
        # Load orders with billing details
        orders = db.query(Order).options(joinedload(Order.billing_details)).all()

        result = []
        for order in orders:
            billing = order.billing_details

            # ✅ Step 1: Find product_basic record using product_id from order
            product_basic = (
                db.query(ProductBasic)
                .filter(ProductBasic.product_id == order.product_id)
                .first()
            )

            # ✅ Step 2: If product_basic found, get related images from product_details
            product_details = None
            if product_basic:
                product_details = (
                    db.query(ProductDetails)
                    .filter(ProductDetails.products_id == product_basic.id)
                    .first()
                )

            result.append({
                "id": order.id,
                "product_id": order.product_id,
                "quantity": order.quantity,
                "total_price": order.total_price,
                "status": order.status,
                "created_at": order.created_at,
                "billing_details": {
                    "name": billing.name if billing else None,
                    "email": billing.email if billing else None,
                    "phone": billing.phone if billing else None,
                    "address": billing.address if billing else None,
                    "city": billing.city if billing else None,
                    "zip_code": billing.zip_code if billing else None,
                    "country": billing.country if billing else None,
                } if billing else None,
                # ✅ Include product details (id + images)
                "product_details": {
                    "id": product_basic.id if product_basic else None,
                    "images": product_details.images if product_details else None,
                } if product_basic else None,
            })

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
