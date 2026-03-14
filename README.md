# Optiscan OCR Web Application

A production-structured OCR application using FastAPI, EasyOCR, and React.

## Project Structure
```
ocr-demo/
├── backend/
│   ├── app/
│   │   ├── main.py (Entry point)
│   │   ├── ocr.py (OCR Processing)
│   │   ├── utils.py (Helpers)
│   │   └── config.py (Settings)
│   ├── venv/ (Virtual Environment)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/ (React components)
    │   ├── api.js (Axios setup)
    │   └── App.jsx
    ├── index.html
    └── vite.config.js
```

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. The virtual environment and dependencies should already be installed if you followed the automated setup. If not:
   ```bash
   python -m venv venv
   ./venv/Scripts/activate  # Windows
   pip install -r requirements.txt
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### 1. Start the Backend
From the `backend` folder:
```bash
./venv/Scripts/python -m app.main
```
The backend will run on `http://localhost:8000`.

### 2. Start the Frontend
From the `frontend` folder:
```bash
npm run dev
```
The frontend will run on the port provided by Vite (usually `http://localhost:5173`).

## Features
- **Drag & Drop Upload**: Easy file selection with preview.
- **FastAPI Backend**: High-performance API with validation.
- **EasyOCR Integration**: State-of-the-art OCR using deep learning.
- **Modern UI**: Clean design with responsive results.
- **Copy to Clipboard**: Quickly copy extracted text.
