import logging
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "FastAPI OCR"
    ALLOWED_HOSTS: List[str] = ["*"]
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_EXTENSIONS: set = {"jpg", "jpeg", "png", "bmp", "tiff", "webp"}
    LOG_LEVEL: str = "INFO"

    class Config:
        case_sensitive = True

settings = Settings()

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)
