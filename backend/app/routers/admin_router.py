import logging
import uuid
import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload  # ✅ Added joinedload
from app.db import get_db
from app.models.product_model import ProductBasic, ProductDetails
from app.schemas.product_schema import ProductCreate, ProductOut, ProductBasicOut, ProductDetailsOut

# Ensure logs directory exists
os.makedirs("logs", exist_ok=True)

logger = logging.getLogger("admin_logger")
logger.setLevel(logging.INFO)
file_handler = logging.FileHandler("logs/admin.log")
formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

router = APIRouter(prefix="/admin", tags=["Admin"])


def generate_product_id():
    """Generate a unique product ID"""
    return f"PROD-{uuid.uuid4().hex[:8].upper()}"


@router.post("/products", response_model=ProductOut)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Create a new product with basic info and details"""
    try:
        logger.info(f"CREATE PRODUCT REQUEST: name={product.name}")

        # Generate unique product_id
        product_id = generate_product_id()

        # Calculate profit and margin
        profit = product.price - product.actual_price
        margin = (profit / product.actual_price * 100) if product.actual_price > 0 else 0

        # Convert specifications to dict list
        specifications_list = None
        if product.specifications and len(product.specifications) > 0:
            filtered_specs = [
                {"label": spec.label, "value": spec.value} 
                for spec in product.specifications 
                if spec.label and spec.value and spec.label.strip() and spec.value.strip()
            ]
            if filtered_specs:
                specifications_list = filtered_specs

        # Handle features - ensure it's a list or None
        features_list = None  # ✅ Initialize here BEFORE the if block
        if product.features and len(product.features) > 0:
            filtered_features = [
                f.strip() 
                for f in product.features 
                if f and f.strip()
            ]
            if filtered_features:
                features_list = filtered_features

        # Handle images - ensure it's a list or None
        images_list = product.images if product.images and len(product.images) > 0 else None

        # Create ProductBasic
        product_basic = ProductBasic(
            product_id=product_id,
            category=product.category,
            name=product.name,
            type=product.type
        )

        db.add(product_basic)
        db.flush()  # Flush to get the ID

        # Create ProductDetails
        product_details = ProductDetails(
            products_id=product_basic.id,
            description=product.description,
            features=features_list,
            specifications=specifications_list,
            images=images_list,
            price=product.price,
            actual_price=product.actual_price,
            profit=profit,
            margin=margin,
            points=product.points
        )
        
        db.add(product_details)
        db.commit()
        db.refresh(product_basic)
        db.refresh(product_details)

        logger.info(f"PRODUCT CREATED SUCCESSFULLY: product_id={product_id}, id={product_basic.id}")

        return ProductOut(
            basic=ProductBasicOut.model_validate(product_basic),
            details=ProductDetailsOut.model_validate(product_details)
        )

    except Exception as e:
        db.rollback()
        logger.error(f"CREATE PRODUCT ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create product: {str(e)}")
        
@router.get("/products", response_model=list[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    """Fetch all products with basic info and details"""
    try:
        logger.info("GET ALL PRODUCTS REQUEST")

        products = (
            db.query(ProductBasic)
            .options(joinedload(ProductBasic.details))
            .all()
        )

        result = []

        for product in products:
            if not product.details or len(product.details) == 0:
                logger.error(f"Missing details for product_id={product.id}")
                continue

            try:
                # Get the first (and should be only) details record
                product_detail = product.details[0]
                
                result.append(
                    ProductOut(
                        basic=ProductBasicOut.model_validate(product),
                        details=ProductDetailsOut.model_validate(product_detail)
                    )
                )
            except Exception as validation_error:
                logger.error(f"Validation error for product {product.id}: {str(validation_error)}")
                logger.error(f"Product data: basic={product.__dict__}, details={product.details[0].__dict__ if product.details else None}")
                continue

        logger.info(f"PRODUCT COUNT RETURNED: {len(result)}")
        return result

    except Exception as e:
        logger.error(f"GET PRODUCTS ERROR: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to fetch products: {str(e)}")