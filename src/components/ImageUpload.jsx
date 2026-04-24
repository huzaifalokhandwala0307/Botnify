import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import './ImageUpload.css';

export default function ImageUpload({ onImageSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => onImageSelect(file, e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="upload-wrapper animate-slide-up">
      <div className="upload-header">
        <h2>Scan a Profile</h2>
        <p>Upload a profile picture to detect AI generation.</p>
      </div>

      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); processFile(e.dataTransfer.files[0]); }}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*"
          onChange={(e) => processFile(e.target.files[0])} />
        <div className="upload-icon-ring">
          <UploadCloud size={28} />
        </div>
        <div className="upload-main-text">Drop image here or click to browse</div>
        <div className="upload-sub-text">Analyze any profile picture for AI generation</div>
        <div className="upload-formats">
          <span className="format-tag">JPG</span>
          <span className="format-tag">PNG</span>
          <span className="format-tag">WEBP</span>
        </div>
      </div>

      <div className="upload-tips">
        <div className="tip-card">
          <span className="tip-icon">👤</span>
          <div className="tip-text"><strong>Best results</strong>Clear, front-facing portrait photos</div>
        </div>
        <div className="tip-card">
          <span className="tip-icon">🔍</span>
          <div className="tip-text"><strong>What we detect</strong>GAN artifacts, texture inconsistencies</div>
        </div>
        <div className="tip-card">
          <span className="tip-icon">🔒</span>
          <div className="tip-text"><strong>Privacy first</strong>Images are not stored on our servers</div>
        </div>
      </div>
    </div>
  );
}