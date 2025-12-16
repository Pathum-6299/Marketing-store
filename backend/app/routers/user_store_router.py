# app/routers/user_store_router.py
import logging
import os
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.db import get_db
from app.models.user_store_model import UserStore,Store
from app.models.product_model import ProductBasic, ProductDetails
from app.schemas.user_store_schema import UserStoreCreate, UserStoreOut,StoreCreate, StoreOut
from app.schemas.product_schema import ProductOut, ProductBasicOut, ProductDetailsOut

# Ensure logs directory exists
os.makedirs("logs", exist_ok=True)

logger = logging.getLogger("user_store_logger")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("logs/user_store.log")
formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

router = APIRouter(prefix="/user-store", tags=["User Store"])


@router.post("/add-product", response_model=UserStoreOut)
def add_product_to_store(data: UserStoreCreate, db: Session = Depends(get_db)):
    """Add a product to user's store"""
    try:
        logger.info(f"ADD PRODUCT TO STORE: user_id={data.user_id}, product_id={data.product_id}")

        # Check if product exists
        product = db.query(ProductBasic).filter(ProductBasic.product_id == data.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        # Check if already added
        existing = db.query(UserStore).filter(
            UserStore.user_id == data.user_id,
            UserStore.product_id == data.product_id
        ).first()

        if existing:
            raise HTTPException(status_code=400, detail="Product already in store")

        # Create user store entry
        user_store = UserStore(
            user_id=data.user_id,
            name=product.name,
            product_id=product.product_id,
            category=product.category,
            type=product.type
        )

        db.add(user_store)
        db.commit()
        db.refresh(user_store)

        logger.info(f"PRODUCT ADDED TO STORE: id={user_store.id}")
        return user_store

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"ADD PRODUCT ERROR: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to add product: {str(e)}")


@router.delete("/remove-product/{user_id}/{product_id}")
def remove_product_from_store(user_id: str, product_id: str, db: Session = Depends(get_db)):
    """Remove a product from user's store"""
    try:
        logger.info(f"REMOVE PRODUCT FROM STORE: user_id={user_id}, product_id={product_id}")

        user_store = db.query(UserStore).filter(
            UserStore.user_id == user_id,
            UserStore.product_id == product_id
        ).first()

        if not user_store:
            raise HTTPException(status_code=404, detail="Product not in store")

        db.delete(user_store)
        db.commit()

        logger.info(f"PRODUCT REMOVED FROM STORE: id={user_store.id}")
        return {"message": "Product removed successfully"}

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"REMOVE PRODUCT ERROR: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to remove product: {str(e)}")


@router.get("/my-products/{user_id}", response_model=list[ProductOut])
def get_user_store_products(user_id: str, db: Session = Depends(get_db)):
    """Get all products in user's store with full details"""
    try:
        logger.info(f"GET USER STORE PRODUCTS: user_id={user_id}")

        # Get all product_ids from user_store
        user_store_entries = db.query(UserStore).filter(UserStore.user_id == user_id).all()
        product_ids = [entry.product_id for entry in user_store_entries]

        if not product_ids:
            return []

        # Get full product details
        products = (
            db.query(ProductBasic)
            .options(joinedload(ProductBasic.details))
            .filter(ProductBasic.product_id.in_(product_ids))
            .all()
        )

        result = []
        for product in products:
            if not product.details or len(product.details) == 0:
                logger.error(f"Missing details for product_id={product.id}")
                continue

            try:
                product_detail = product.details[0]
                result.append(
                    ProductOut(
                        basic=ProductBasicOut.model_validate(product),
                        details=ProductDetailsOut.model_validate(product_detail)
                    )
                )
            except Exception as validation_error:
                logger.error(f"Validation error for product {product.id}: {str(validation_error)}")
                continue

        logger.info(f"USER STORE PRODUCT COUNT: {len(result)}")
        return result

    except Exception as e:
        logger.error(f"GET USER STORE PRODUCTS ERROR: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to fetch products: {str(e)}")

@router.get("/products/{product_id}", response_model=ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    """Get full single product (basic + details)"""
    try:
        product = (
            db.query(ProductBasic)
            .options(joinedload(ProductBasic.details))  # Load details table
            .filter(ProductBasic.product_id == product_id)
            .first()
        )

        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        if not product.details:
            raise HTTPException(status_code=500, detail="Product details missing")

        details = product.details[0]  # Assuming one-to-one relationship

        return ProductOut(
            basic=ProductBasicOut.model_validate(product),
            details=ProductDetailsOut.model_validate(details),
        )

    except Exception as e:
        logger.error(f"GET PRODUCT ERROR: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to load product: {str(e)}")

@router.post("/create-store", response_model=StoreOut)
def create_store(data: StoreCreate, db: Session = Depends(get_db)):
    """
    Create a new store
    """
    try:
        logger.info(f"CREATE STORE: user_id={data.user_id}, store_code={data.store_code}")

        # Check if store code already exists
        existing_store = db.query(Store).filter(
            Store.store_code == data.store_code
        ).first()

        if existing_store:
            raise HTTPException(
                status_code=400,
                detail="Store code already exists"
            )

        store = Store(
            store_id=str(uuid.uuid4()),
            store_name=data.store_name,
            user_id=data.user_id,
            username=data.username,
            store_code=data.store_code,
        )

        db.add(store)
        db.commit()
        db.refresh(store)

        logger.info(f"STORE CREATED: store_id={store.store_id}")
        return store

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        logger.error(f"CREATE STORE ERROR: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Failed to create store"
        )