import easyocr
import numpy as np
from PIL import Image
import io
import ssl
from .config import logger

# Bypass SSL verification for model download
ssl._create_default_https_context = ssl._create_unverified_context

# Initialize reader at module level (once)
try:
    logger.info("Initializing EasyOCR reader...")
    reader = easyocr.Reader(['en'])
    logger.info("EasyOCR reader initialized successfully.")
except Exception as e:
    logger.error(f"Failed to initialize EasyOCR reader: {e}")
    reader = None

async def process_ocr(file_bytes: bytes):
    if reader is None:
        raise Exception("OCR reader is not initialized")

    # Convert bytes to numpy array
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    image_np = np.array(image)

    # Run OCR
    # detail=1 returns (bbox, text, confidence)
    results = reader.readtext(image_np)
    
    return results
