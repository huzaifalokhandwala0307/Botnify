import { RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import SafetyCenter from './SafetyCenter';
import './ResultCard.css';

export default function ResultCard({ image, result, onReset }) {
  if (!result) return null;

  const botProb = result?.botProbability ?? 0.75;
  const conf = result?.confidence ?? 0.75;
  const confidencePercent = Math.round(conf * 100);
  const botProbPercent = Math.round(botProb * 100);

  let classification, colorClass, Icon, verdictTitle, subtitleMsg;

  if (botProb <= 0.3) {
    classification = 'Likely Real';
    colorClass = 'success';
    Icon = CheckCircle;
    verdictTitle = 'Authentic Image';
    subtitleMsg = <>We are <strong>{confidencePercent}%</strong> confident this profile is a real human.</>;
  } else if (botProb <= 0.7) {
    classification = 'Uncertain';
    colorClass = 'warning';
    Icon = AlertTriangle;
    verdictTitle = 'Inconclusive Result';
    subtitleMsg = <>The results are inconclusive. We are uncertain if this is real or AI-generated.</>;
  } else {
    classification = 'Likely Fake';
    colorClass = 'danger';
    Icon = AlertTriangle;
    verdictTitle = 'Deepfake Detected';
    subtitleMsg = <>We are <strong>{confidencePercent}%</strong> confident this profile is an AI-generated deepfake.</>;
  }

  return (
    <div className="result-container glass-panel animate-slide-up">
      <div className="result-layout">
        <div className="result-image-side">
          <div className={`result-image-wrapper border-${colorClass}`}>
            <img src={image} alt="Analyzed profile" />
            <div className={`verdict-badge bg-${colorClass}`}>
              <Icon size={16} />
              {verdictTitle}
            </div>
          </div>
        </div>

        <div className="result-details-side">
          <div className="verdict-header">
            <h3>Analysis Result</h3>
            <p className="verdict-subtitle">
              {subtitleMsg}
            </p>
            <p className="explanation-text text-sm text-secondary mt-2 italic">
              * This result is based on a pretrained deepfake detection model.
            </p>
          </div>

          <div className="meter-container">
            <div className="meter-label">
              <span>Deepfake Probability Score</span>
              <span>{botProbPercent}%</span>
            </div>
            <div className="meter-bar-bg">
              <div 
                className={`meter-bar-fill bg-${colorClass}`}
                style={{ width: `${botProbPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="insights-container">
            <h4><Info size={16} /> Technical Insights</h4>
            <ul className="insights-list">
              {result?.insights?.length ? (
                result.insights.map((insight, idx) => (
                  <li key={idx}>
                    <span className="bullet"></span>
                    {insight}
                  </li>
                ))
              ) : (
                <li>
                  <span className="bullet"></span>
                  No insights available
                </li>
              )}      
            </ul>
          </div>

          <SafetyCenter classification={classification} />

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={onReset}>
              <RefreshCw size={18} />
              Scan Another Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

