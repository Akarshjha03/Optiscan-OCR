import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ResultDisplay from './components/ResultDisplay';
import { performOCR } from './api';
import './index.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await performOCR(file);
      if (data.success) {
        setResult(data);
      } else {
        setError('Extraction failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred during OCR processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Optiscan OCR</h1>
        <p>Extract text from images using FastAPI and EasyOCR</p>
      </header>

      <main>
        <UploadForm onUpload={handleUpload} info={{ loading }} />

        {loading && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p>Processing with AI... this may take a moment.</p>
          </div>
        )}

        {error && (
          <div className="result-container" style={{ borderColor: 'var(--error)', border: '1px solid var(--error)' }}>
            <p className="error-text" style={{ textAlign: 'center' }}>{error}</p>
          </div>
        )}

        <ResultDisplay result={result} />
      </main>

      <footer style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        Built with FastAPI, React, and EasyOCR
      </footer>
    </div>
  );
}

export default App;
