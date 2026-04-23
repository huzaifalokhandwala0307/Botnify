import { useState, useEffect } from 'react';
import { ScanFace, AlertTriangle } from 'lucide-react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import ProcessingScreen from './components/ProcessingScreen';
import ResultCard from './components/ResultCard';
import HistorySidebar from './components/HistorySidebar';
import { predictImage } from './services/modelService';

function App() {
  const [view, setView] = useState('upload'); // 'upload', 'processing', 'result'
  const [currentImage, setCurrentImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('botsniff_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem('botsniff_history', JSON.stringify(history));
  }, [history]);

  const handleImageSelect = (file, dataUrl) => {
    setCurrentImage({ file, dataUrl });
    handleScan(dataUrl);
  };

  const handleScan = async (dataUrl) => {
    setView('processing');
    setError(null);
    
    // Create an image element for prediction
    const imgElement = new Image();
    imgElement.src = dataUrl;
    
    await new Promise(resolve => {
      imgElement.onload = resolve;
    });

    try {
      // Run inference against HF API
      const result = await predictImage(imgElement);
      setPrediction(result);
      
      // Add to history
      setHistory(prev => [
        {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          image: dataUrl,
          result: result
        },
        ...prev
      ].slice(0, 10)); // Keep last 10
      
      setView('result');
    } catch (err) {
      console.error("Prediction failed:", err);
      setError(err.message || "Failed to analyze image. Please try again.");
      setView('upload');
    }
  };

  const resetScan = () => {
    setCurrentImage(null);
    setPrediction(null);
    setError(null);
    setView('upload');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          <ScanFace className="logo-icon" size={28} />
          <span>BotSniff</span>
        </div>
        <div>
           {/* Add a placeholder for user profile or auth later */}
        </div>
      </nav>

      <main className="main-content">
        <div className="workspace">
          {error && (
            <div className="error-banner animate-slide-up">
              <AlertTriangle size={20} />
              <span>{error}</span>
              <button className="error-close" onClick={() => setError(null)}>×</button>
            </div>
          )}

          {view === 'upload' && (
            <ImageUpload onImageSelect={handleImageSelect} />
          )}
          
          {view === 'processing' && (
            <ProcessingScreen image={currentImage?.dataUrl} />
          )}

          {view === 'result' && (
            <ResultCard 
              image={currentImage?.dataUrl} 
              result={prediction} 
              onReset={resetScan} 
            />
          )}
        </div>

        <aside className="sidebar">
          <HistorySidebar history={history} />
        </aside>
      </main>
    </div>
  );
}

export default App;
