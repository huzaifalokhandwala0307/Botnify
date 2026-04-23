import { useEffect, useState } from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';
import './ProcessingScreen.css';

export default function ProcessingScreen({ image }) {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Extracting facial features...", icon: <Zap size={18} /> },
    { text: "Analyzing texture patterns...", icon: <Cpu size={18} /> },
    { text: "Running AI detection model...", icon: <ShieldCheck size={18} /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + (100 - p) * 0.1; // Smooth ease-out
        return next > 99 ? 99 : next; // Cap at 99 until actually done
      });
    }, 100);

    const stepTimer = setInterval(() => {
      setStep(s => Math.min(s + 1, 2));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(stepTimer);
    };
  }, []);

  return (
    <div className="processing-container glass-panel animate-slide-up">
      <div className="processing-header">
        <div className="pulse-ring">
          <div className="spinner-ring"></div>
          <div className="scanning-image-wrapper">
            {image && <img src={image} alt="Scanning" className="scanning-image" />}
            <div className="scan-line"></div>
          </div>
        </div>
        <h2>Analyzing Image</h2>
        <p>Our AI is examining the pixel structure...</p>
      </div>

      <div className="progress-section">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="step-text">
             <span className="step-icon">{steps[step].icon}</span>
             {steps[step].text}
          </span>
          <span className="percentage">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
