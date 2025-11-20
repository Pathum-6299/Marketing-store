from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.routers import auth_router, admin_router, user_store_router,order_router
from app.models import user_model, referral_model, product_model  # Import models to register them
from fastapi.staticfiles import StaticFiles
import os
app = FastAPI(title="Store Platform")

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or set to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB Tables
Base.metadata.create_all(bind=engine)

# Routers
app.include_router(auth_router.router)
app.include_router(admin_router.router)
app.include_router(user_store_router.router)
app.include_router(order_router.router)

@app.get("/")
def root():
    return {"message": "Welcome to Store Platform API"}
