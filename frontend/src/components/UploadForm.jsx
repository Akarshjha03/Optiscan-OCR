import React, { useState, useCallback } from 'react';

const UploadForm = ({ onUpload, info }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const validateAndSetFile = (selectedFile) => {
        setError(null);
        if (!selectedFile) return;

        if (!selectedFile.type.startsWith('image/')) {
            setError('Please select an image file (jpg, png, etc.)');
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            setError('File size too large (max 10MB)');
            return;
        }

        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleFileChange = (e) => {
        validateAndSetFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        validateAndSetFile(e.dataTransfer.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="upload-container">
            <form onSubmit={handleSubmit}>
                <div
                    className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {preview ? (
                        <img src={preview} alt="Preview" className="preview-img" />
                    ) : (
                        <p>Drag & Drop an image here or click to browse</p>
                    )}
                </div>

                {error && <p className="error-text">{error}</p>}

                <button type="submit" disabled={!file || info.loading} className="submit-btn">
                    {info.loading ? 'Processing...' : 'Perform OCR'}
                </button>
            </form>
        </div>
    );
};

export default UploadForm;
