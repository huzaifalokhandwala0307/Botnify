import { RefreshCw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import SafetyCenter from './SafetyCenter';
import './ResultCard.css';

export default function ResultCard({ image, result, onReset }) {
  if (!result) return null;

  const botProb = result?.botProbability ?? 0.5;
  const conf = result?.confidence ?? 0.5;
  const confidencePercent = Math.round(conf * 100);
  const botProbPercent = Math.round(botProb * 100);

  let classification, colorClass, fillClass, Icon, verdictTitle, subtitleMsg;

  if (botProb <= 0.3) {
    classification = 'Likely Real';
    colorClass = 'success';
    fillClass = 'bg-success-fill';
    Icon = CheckCircle;
    verdictTitle = 'Authentic Image';
    subtitleMsg = <>We are <strong>{confidencePercent}%</strong> confident this profile is a real human.</>;
  } else if (botProb <= 0.7) {
    classification = 'Uncertain';
    colorClass = 'warning';
    fillClass = 'bg-warning-fill';
    Icon = AlertTriangle;
    verdictTitle = 'Inconclusive Result';
    subtitleMsg = <>The results are inconclusive. We are uncertain if this is real or AI-generated.</>;
  } else {
    classification = 'Likely Fake';
    colorClass = 'danger';
    fillClass = 'bg-danger-fill';
    Icon = AlertTriangle;
    verdictTitle = 'Deepfake Detected';
    subtitleMsg = <>We are <strong>{confidencePercent}%</strong> confident this profile is an AI-generated deepfake.</>;
  }

  return (
    <div className="result-container">
      <div className="result-layout">
        {/* Image */}
        <div className="result-image-side">
          <div className={`result-image-wrapper border-${colorClass}`}>
            <img src={image} alt="Analyzed profile" />
            <div className="result-image-overlay" />
            <div className={`verdict-badge bg-${colorClass}`}>
              <Icon size={13} />
              {verdictTitle}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="result-details-side">
          <div className="verdict-header">
            <div className="verdict-label">Analysis Result</div>
            <h3 className="verdict-title">{verdictTitle}</h3>
            <p className="verdict-subtitle">{subtitleMsg}</p>
            <p className="disclaimer">* Based on a pretrained deepfake detection model.</p>
          </div>

          <div className="meter-container">
            <div className="meter-label">
              <span className="meter-name">Deepfake Probability Score</span>
              <span className="meter-value">{botProbPercent}%</span>
            </div>
            <div className="meter-bar-bg">
              <div className={`meter-bar-fill ${fillClass}`} style={{ width: `${botProbPercent}%` }} />
            </div>
          </div>

          <div className="insights-container">
            <div className="insights-title">
              <Info size={14} /> Technical Insights
            </div>
            <ul className="insights-list">
              {result?.insights?.length ? (
                result.insights.map((insight, idx) => <li key={idx}>{insight}</li>)
              ) : (
                <li>No insights available</li>
              )}
            </ul>
          </div>

          <SafetyCenter classification={classification} />

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={onReset}>
              <RefreshCw size={16} /> Scan Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}