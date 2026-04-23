import { ShieldAlert, ExternalLink, Camera, AlertTriangle, Copy, Info } from "lucide-react";
import './SafetyCenter.css';

export default function SafetyCenter({ classification }) {
  if (classification === 'Likely Real') {
    return (
      <div className="safety-center likely-real animate-slide-up">
        <div className="safety-banner">
          <ShieldAlert className="safety-icon-large" size={24} />
          <div className="safety-banner-text">
            <h4>Safe Profile</h4>
            <p>No significant signs of AI generation were detected. This profile appears to be authentic.</p>
          </div>
        </div>
      </div>
    );
  }

  if (classification === 'Uncertain') {
    return (
      <div className="safety-center uncertain animate-slide-up">
        <div className="safety-banner">
          <AlertTriangle className="safety-icon-large" size={24} />
          <div className="safety-banner-text">
            <h4>Uncertain Analysis</h4>
            <p>We cannot definitively conclude if this profile is real or AI-generated. Please exercise caution.</p>
          </div>
        </div>
        <div className="safety-tips">
          <h5><Info size={16} /> Best Practices</h5>
          <ul>
            <li>Verify their identity through external, trusted sources.</li>
            <li>Be cautious about sharing personal information.</li>
          </ul>
        </div>
      </div>
    );
  }

  // Likely Fake
  return (
    <div className="safety-center danger animate-slide-up">
      <div className="safety-banner">
        <ShieldAlert className="safety-icon-large" size={24} />
        <div className="safety-banner-text">
          <h4>Security Warning</h4>
          <p>This profile exhibits high probability of being AI-generated and may be used for scams or misinformation.</p>
        </div>
      </div>

      <div className="safety-tips">
        <h5><Info size={16} /> Safety Recommendations</h5>
        <ul>
          <li>Do not share personal or financial information.</li>
          <li>Avoid clicking suspicious links in their bio or messages.</li>
          <li>Verify their identity through external, trusted sources.</li>
        </ul>
      </div>

      <div className="safety-actions">
        <button 
          className="btn btn-action instagram"
          onClick={() => window.open('https://help.instagram.com/514187739359208', '_blank')}
        >
          <ExternalLink size={16} />
          Report on Instagram
        </button>

        <button 
          className="btn btn-action cybercrime"
          onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
        >
          <ExternalLink size={16} />
          Report Cyber Crime
        </button>

        <button 
          className="btn btn-action copy"
          onClick={() => {
            navigator.clipboard.writeText("Flagged AI Profile - Verified by BotSniff");
            alert("Details copied to clipboard.");
          }}
        >
          <Copy size={16} />
          Copy Profile Details
        </button>
      </div>
    </div>
  );
}
