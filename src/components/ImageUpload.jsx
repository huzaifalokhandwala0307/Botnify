import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import './ImageUpload.css';

export default function ImageUpload({ onImageSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(file, e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="upload-container glass-panel animate-slide-up">
      <div className="upload-header">
        <h2>Scan Profile</h2>
        <p>Upload a profile picture to detect AI generation.</p>
      </div>

      <div 
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*"
          onChange={handleFileChange}
        />
        
        <div className="drop-content">
          <div className="icon-wrapper">
            <UploadCloud size={48} className="upload-icon" />
          </div>
          <h3>Drag & drop an image here</h3>
          <p>or click to browse your files</p>
          
          <div className="format-hint">
            <ImageIcon size={16} />
            <span>Supports JPG, PNG, WEBP</span>
          </div>
        </div>
      </div>

      <div className="instagram-mockup">
        <div className="mockup-header">
          <div className="mockup-avatar"></div>
          <div className="mockup-name">
            <div className="mockup-line w-24"></div>
            <div className="mockup-line w-16 subtle"></div>
          </div>
        </div>
        <div className="mockup-image-placeholder">
          Upload an image to preview
        </div>
      </div>
    </div>
  );
}
