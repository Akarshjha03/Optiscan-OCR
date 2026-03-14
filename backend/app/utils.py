from fastapi import HTTPException, UploadFile
import os
from .config import settings, logger

def validate_file(file: UploadFile):
    # Check extension
    filename = file.filename
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in settings.ALLOWED_EXTENSIONS:
        logger.warning(f"Invalid file extension: {ext}")
        raise HTTPException(status_code=400, detail=f"Invalid file type. Allowed: {', '.join(settings.ALLOWED_EXTENSIONS)}")

    # Check file size
    file.file.seek(0, os.SEEK_END)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > settings.MAX_FILE_SIZE:
        logger.warning(f"File too large: {file_size} bytes")
        raise HTTPException(status_code=413, detail=f"File too large. Maximum size is {settings.MAX_FILE_SIZE // (1024*1024)}MB")

def format_ocr_results(results):
    formatted_details = []
    full_text = []

    for (bbox, text, confidence) in results:
        # Convert bbox to list of lists as requested
        bbox_list = [list(map(float, pt)) for pt in bbox]
        formatted_details.append({
            "text": text,
            "confidence": float(confidence),
            "bbox": bbox_list
        })
        full_text.append(text)

    return " ".join(full_text), formatted_details
