import { ScanFace, Shield, Zap, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import './Home.css';

export default function Home({ onGetStarted }) {
  return (
    <div className="landing">
      {/* Background */}
      <div className="landing-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Nav */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon"><ScanFace size={18} /></div>
          BotSniff
        </div>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how-it-works" className="nav-link">How it works</a>
          <a href="#" className="nav-link">Accuracy</a>
        </div>
        <button className="nav-cta" onClick={onGetStarted}>Try for free →</button>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Powered Detection
          </div>
          <h1 className="hero-title">
            Detect deepfakes<br />
            <span className="gradient-text">before they deceive.</span>
          </h1>
          <p className="hero-subtitle">
            BotSniff uses advanced vision AI to analyze profile pictures and detect 
            AI-generated faces in seconds. Protect yourself from bots, catfish, and synthetic identities.
          </p>
          <div className="hero-actions">
            <button className="btn-hero btn-hero-primary" onClick={onGetStarted}>
              Scan a Profile <ArrowRight size={18} />
            </button>
            <button className="btn-hero btn-hero-secondary" onClick={onGetStarted}>
              See how it works
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-value">99.2%</span>
              <span className="stat-label">Lab Accuracy</span>
            </div>
            <div className="stat">
              <span className="stat-value">&lt;3s</span>
              <span className="stat-label">Analysis Time</span>
            </div>
            <div className="stat">
              <span className="stat-value">Free</span>
              <span className="stat-label">No signup</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="hero-visual">
          <div className="scan-card">
            <div className="scan-card-header">
              <span className="scan-card-title">Profile Analysis</span>
              <div className="scan-status">
                <span className="status-dot" />
                Scanning...
              </div>
            </div>
            <div className="scan-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=480&fit=crop&crop=face"
                alt="Demo scan"
              />
              <div className="scan-line" />
              <div className="scan-overlay" />
              <div className="scan-corner scan-corner-tl" />
              <div className="scan-corner scan-corner-tr" />
              <div className="scan-corner scan-corner-bl" />
              <div className="scan-corner scan-corner-br" />
              <div className="scan-result-pill">
                <CheckCircle size={12} /> Authentic — 98% Real
              </div>
            </div>
            <div className="scan-card-footer">
              <span className="score-label">Deepfake Score</span>
              <div className="score-bar-wrap">
                <div className="score-bar-fill" />
              </div>
              <span className="score-value">2%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-label">// capabilities</div>
        <h2 className="section-title">Built for real-world detection</h2>
        <p className="section-sub">
          Combining multiple AI models for balanced, accurate results across diverse faces and photo conditions.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon feature-icon-purple"><Shield size={20} /></div>
            <div className="feature-title">Ensemble Detection</div>
            <p className="feature-desc">
              Runs multiple deepfake detection models in parallel and averages results to reduce false positives.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon feature-icon-cyan"><Zap size={20} /></div>
            <div className="feature-title">Real-time Analysis</div>
            <p className="feature-desc">
              Get results in under 3 seconds with our optimized pipeline. No waiting, no queues.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon feature-icon-green"><Eye size={20} /></div>
            <div className="feature-title">Technical Insights</div>
            <p className="feature-desc">
              Understand why an image was flagged with detailed insights about GAN artifacts and facial patterns.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-label">// process</div>
        <h2 className="section-title">Three steps to the truth</h2>
        <p className="section-sub">No account needed. Just drop an image and get instant results.</p>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-title">Upload a Profile Photo</div>
            <p className="step-desc">Drag and drop any profile picture — JPG, PNG, or WEBP. We compress it client-side before sending.</p>
          </div>
          <div className="step">
            <div className="step-number">02</div>
            <div className="step-title">AI Analyzes the Image</div>
            <p className="step-desc">Our backend queries HuggingFace-hosted vision models trained on 76,000+ real and fake face pairs.</p>
          </div>
          <div className="step">
            <div className="step-number">03</div>
            <div className="step-title">Get Your Verdict</div>
            <p className="step-desc">See a deepfake probability score, confidence level, technical insights, and safety recommendations.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="cta-box">
          <h2 className="cta-title">Ready to sniff out the bots?</h2>
          <p className="cta-sub">Free, instant, no signup required. Just drop an image.</p>
          <button className="btn-hero btn-hero-primary" onClick={onGetStarted}>
            Start Scanning <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <span className="footer-text">© 2024 BotSniff</span>
        <span className="footer-note">Powered by HuggingFace Inference API</span>
      </footer>
    </div>
  );
}