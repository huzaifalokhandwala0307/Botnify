import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import './HistorySidebar.css';

export default function HistorySidebar({ history }) {
  return (
    <div className="history-sidebar">
      <div className="sidebar-title"><Clock size={13} /> Recent Scans</div>

      {(!history || history.length === 0) ? (
        <div className="empty-history">
          <span className="empty-icon">🔍</span>
          <span className="empty-title">No scans yet</span>
          <span className="empty-sub">Your recent scans will appear here</span>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item) => {
            const botProb = item.result?.botProbability ?? 0.5;
            let Icon, colorClass, label;
            if (botProb <= 0.3) { Icon = CheckCircle; colorClass = 'text-success'; label = 'Authentic'; }
            else if (botProb <= 0.7) { Icon = AlertTriangle; colorClass = 'text-warning'; label = 'Uncertain'; }
            else { Icon = AlertTriangle; colorClass = 'text-danger'; label = 'Deepfake'; }

            return (
              <div key={item.id} className="history-item">
                <img src={item.image} alt="thumb" className="history-thumb" />
                <div className="history-info">
                  <div className="history-verdict">
                    <Icon size={13} className={colorClass} />
                    <span>{label}</span>
                  </div>
                  <div className="history-meta">
                    {Math.round(botProb * 100)}% fake · {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}