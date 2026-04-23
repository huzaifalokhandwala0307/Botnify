import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import './HistorySidebar.css';

export default function HistorySidebar({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="history-sidebar glass-panel">
        <h3 className="sidebar-title"><Clock size={18} /> Scan History</h3>
        <div className="empty-history">
          <p>No scans yet.</p>
          <span className="text-muted text-sm">Your recent scans will appear here.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="history-sidebar glass-panel">
      <h3 className="sidebar-title"><Clock size={18} /> Recent Scans</h3>
      
      <div className="history-list">
        {history.map((item) => {
          const isReal = item.result.class === 'Real';
          const Icon = isReal ? CheckCircle : AlertTriangle;
          const colorClass = isReal ? 'text-success' : 'text-danger';

          return (
            <div key={item.id} className="history-item">
              <img src={item.image} alt="Scan thumbnail" className="history-thumb" />
              <div className="history-info">
                <div className="history-verdict">
                  <Icon size={14} className={colorClass} />
                  <span>{isReal ? 'Authentic' : 'Bot Detected'}</span>
                </div>
                <div className="history-meta">
                  <span>{Math.round(item.result.confidence * 100)}% Match</span>
                  <span>•</span>
                  <span>{new Date(item.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
