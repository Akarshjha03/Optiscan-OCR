from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .config import settings, logger
from .utils import validate_file, format_ocr_results
from .ocr import process_ocr

app = FastAPI(title=settings.PROJECT_NAME)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_HOSTS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/ocr")
async def perform_ocr(file: UploadFile = File(...)):
    # 1. Validate file
    validate_file(file)
    
    try:
        # 2. Read file bytes
        file_bytes = await file.read()
        
        # 3. Process OCR
        logger.info(f"Processing OCR for file: {file.filename}")
        results = await process_ocr(file_bytes)
        
        # 4. Format results
        full_text, details = format_ocr_results(results)
        
        return {
            "success": True,
            "filename": file.filename,
            "text": full_text,
            "details": details
        }
        
    except Exception as e:
        logger.error(f"OCR processing failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
