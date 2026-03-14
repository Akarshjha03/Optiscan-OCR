import React from 'react';

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result.text);
        alert('Extracted text copied to clipboard!');
    };

    return (
        <div className="result-container">
            <div className="result-header">
                <h3>Extracted Text</h3>
                <button onClick={copyToClipboard} className="copy-btn">Copy to Clipboard</button>
            </div>

            <div className="text-output">
                <pre>{result.text}</pre>
            </div>

            <h4>Details (Segments found: {result.details.length})</h4>
            <div className="details-list">
                {result.details.map((item, idx) => (
                    <div key={idx} className="detail-item">
                        <span className="segment-text">"{item.text}"</span>
                        <span className="confidence">
                            Confidence: {(item.confidence * 100).toFixed(2)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultDisplay;
