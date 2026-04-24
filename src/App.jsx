import { useState, useEffect } from 'react';
import { ScanFace, AlertTriangle } from 'lucide-react';
import './App.css';
import LandingPage from './components/LandingPage';
import ImageUpload from './components/ImageUpload';
import ProcessingScreen from './components/ProcessingScreen';
import ResultCard from './components/ResultCard';
import HistorySidebar from './components/HistorySidebar';
import { predictImage } from './services/modelService';

function App() {
  const [page, setPage] = useState('landing'); // 'landing', 'app'
  const [view, setView] = useState('upload');
  const [currentImage, setCurrentImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('botsniff_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

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

    const imgElement = new Image();
    imgElement.src = dataUrl;
    await new Promise(resolve => { imgElement.onload = resolve; });

    try {
      const result = await predictImage(imgElement);
      setPrediction(result);
      setHistory(prev => [{
        id: Date.now().toString(),
        date: new Date().toISOString(),
        image: dataUrl,
        result,
      }, ...prev].slice(0, 10));
      setView('result');
    } catch (err) {
      console.error('Prediction failed:', err);
      setError(err.message || 'Failed to analyze image. Please try again.');
      setView('upload');
    }
  };

  const resetScan = () => {
    setCurrentImage(null);
    setPrediction(null);
    setError(null);
    setView('upload');
  };

  if (page === 'landing') {
    return <LandingPage onGetStarted={() => setPage('app')} />;
  }

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-logo-wrap" onClick={() => { setPage('landing'); resetScan(); }}>
          <div className="nav-logo-box"><ScanFace size={16} /></div>
          BotSniff
        </div>
        <div className="nav-right">
          <span className="nav-tag">AI Deepfake Detector</span>
        </div>
      </nav>

      <main className="main-content">
        <div className="workspace">
          {error && (
            <div className="error-banner animate-slide-up">
              <AlertTriangle size={18} />
              <span>{error}</span>
              <button className="error-close" onClick={() => setError(null)}>×</button>
            </div>
          )}
          {view === 'upload' && <ImageUpload onImageSelect={handleImageSelect} />}
          {view === 'processing' && <ProcessingScreen image={currentImage?.dataUrl} />}
          {view === 'result' && (
            <ResultCard image={currentImage?.dataUrl} result={prediction} onReset={resetScan} />
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