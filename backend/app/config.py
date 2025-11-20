import os
from dotenv import load_dotenv
from urllib.parse import quote_plus  # ✅ Needed for encoding passwords

load_dotenv()  # Load variables from .env

class Settings:
    PROJECT_NAME: str = "Store Platform"
    API_VERSION: str = "v1"

    MYSQL_USER: str = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "990522@Mysql")
    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_DB: str = os.getenv("MYSQL_DB", "store")

    # ✅ Encode password to handle @, #, $, etc.
    ENCODED_PASSWORD = quote_plus(MYSQL_PASSWORD)

    DATABASE_URL: str = (
        f"mysql+mysqlconnector://{MYSQL_USER}:{ENCODED_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"
    )

    SECRET_KEY: str = os.getenv("SECRET_KEY", "mysecretkey")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

settings = Settings()
