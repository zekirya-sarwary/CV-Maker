import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCV } from '../context/CVContext'
import './Landing.css'

const templates = [
  { id: 'minimalist', label: 'Minimalist', color: '#64748b', desc: 'Clean, elegant, timeless' },
  { id: 'modern', label: 'Modern', color: '#6366f1', desc: 'Bold, vibrant, impactful' },
  { id: 'creative', label: 'Creative', color: '#0ea5e9', desc: 'Unique, two-column layout' },
  { id: 'corporate', label: 'Corporate', color: '#155e75', desc: 'Classic, authoritative' },
  { id: 'elegant', label: 'Elegant', color: '#8b5cf6', desc: 'Sleek, high-end serif focus' },
  { id: 'executive', label: 'Executive', color: '#1a293b', desc: 'Dense grid, formal structure' },
]

const features = [
  { icon: '⚡', title: 'Live Preview', desc: 'See your CV update in real-time as you type' },
  { icon: '🎨', title: '4 Templates', desc: 'Choose from professionally designed themes' },
  { icon: '📄', title: 'PDF Export', desc: 'Download a perfectly formatted PDF instantly' },
  { icon: '💾', title: 'Auto-Save', desc: 'Your work is saved automatically in the browser' },
  { icon: '🌙', title: 'Dark Mode', desc: 'Comfortable editing in any light condition' },
  { icon: '📱', title: 'Responsive', desc: 'Works beautifully on any device' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { state, dispatch } = useCV()
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  return (
    <div className="landing">
      {/* NAV */}
      <nav className="landing-nav">
        <div className="container landing-nav__inner">
          <div className="landing-logo">
            <span className="landing-logo__icon">✦</span>
            <span className="landing-logo__text">CV Maker</span>
          </div>
          <div className="landing-nav__actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setIsAboutOpen(true)}>
              About Me
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
              aria-label="Toggle dark mode"
            >
              {state.meta.darkMode ? '☀️' : '🌙'}
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/builder')}>
              Start Building
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="landing-hero">
        <div className="container landing-hero__inner">
          <div className="landing-hero__badge badge badge-accent fade-in">
            ✦ Free & No Sign-up Required
          </div>
          <h1 className="landing-hero__title fade-in">
            Create Your Perfect
            <span className="landing-hero__gradient"> CV in Minutes</span>
          </h1>
          <p className="landing-hero__sub fade-in">
            Build a stunning, professional resume with our intuitive builder.
            Choose from beautiful templates, fill in your details and download your CV as a PDF — all for free.
          </p>
          <div className="landing-hero__cta fade-in">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/builder')}>
              Build My CV →
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/builder')}>
              View Templates
            </button>
          </div>

          {/* Mock preview */}
          <div className="landing-hero__preview fade-in">
            <div className="landing-preview-card">
              <div className="lp-sidebar">
                <div className="lp-avatar" />
                <div className="lp-line lp-line--name" />
                <div className="lp-line lp-line--sub" />
                <div className="lp-divider" />
                <div className="lp-section-title" />
                <div className="lp-line" />
                <div className="lp-line lp-line--short" />
                <div className="lp-line" />
                <div className="lp-divider" />
                <div className="lp-section-title" />
                {['90%', '75%', '85%', '60%'].map((w, i) => (
                  <div key={i} className="lp-skill-row">
                    <div className="lp-line lp-line--short" style={{ width: '60%' }} />
                    <div className="lp-skill-bar"><div className="lp-skill-fill" style={{ width: w }} /></div>
                  </div>
                ))}
              </div>
              <div className="lp-main">
                <div className="lp-section-title" />
                <div className="lp-line" />
                <div className="lp-line lp-line--sub" />
                <div className="lp-line" />
                <div className="lp-line lp-line--short" />
                <div className="lp-divider" />
                <div className="lp-section-title" />
                <div className="lp-job">
                  <div className="lp-line lp-line--sub" />
                  <div className="lp-line lp-line--muted" />
                  <div className="lp-line" />
                  <div className="lp-line lp-line--short" />
                </div>
                <div className="lp-job">
                  <div className="lp-line lp-line--sub" />
                  <div className="lp-line lp-line--muted" />
                  <div className="lp-line" />
                </div>
                <div className="lp-divider" />
                <div className="lp-section-title" />
                <div className="lp-line" />
                <div className="lp-line lp-line--short" />
              </div>
            </div>
            <div className="landing-preview__glow" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-features">
        <div className="container">
          <h2 className="section-title">Everything you need</h2>
          <p className="section-sub">Powerful features to help you stand out</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card card">
                <span className="feature-card__icon">{f.icon}</span>
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="landing-templates">
        <div className="container">
          <h2 className="section-title">Professional Templates</h2>
          <p className="section-sub">Start with a beautiful design, then make it yours</p>
          <div className="templates-grid">
            {templates.map((t) => (
              <button
                key={t.id}
                className="template-card"
                onClick={() => {
                  dispatch({ type: 'SET_TEMPLATE', payload: t.id })
                  navigate('/builder')
                }}
              >
                <div className="template-card__preview" style={{ '--tcolor': t.color }}>
                  <div className="tc-header" />
                  <div className="tc-body">
                    <div className="tc-line tc-line--title" />
                    <div className="tc-line" />
                    <div className="tc-line tc-line--short" />
                    <div className="tc-line" />
                    <div className="tc-line tc-line--short" />
                  </div>
                </div>
                <div className="template-card__info">
                  <span className="template-card__name">{t.label}</span>
                  <span className="template-card__desc">{t.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="container landing-cta__inner">
          <h2 className="landing-cta__title">Ready to land your dream job?</h2>
          <p className="landing-cta__sub">Create your professional CV in under 10 minutes — completely free.</p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/builder')}>
            Get Started Now →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="container landing-footer__inner">
          <div className="landing-footer__left">
            <div className="landing-logo">
              <span className="landing-logo__icon">✦</span>
              <span className="landing-logo__text">CV Maker</span>
            </div>
            <p className="landing-footer__copy">© 2026 CV Maker · Built with ♥ for job seekers everywhere</p>
            <p className="landing-footer__copy">Email: zekirya.sarwary888@gmail.com</p>
          </div>
          <div className="landing-footer__socials">
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.54 12 19.54 12 19.54s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>
      </footer>

      {/* ABOUT ME MODAL */}
      {isAboutOpen && (
        <div className="about-modal-overlay" onClick={() => setIsAboutOpen(false)}>
          <div className="about-modal fade-in" onClick={e => e.stopPropagation()}>
            <button className="about-modal__close" onClick={() => setIsAboutOpen(false)}>×</button>
            <div className="about-modal__content">
              <h2 className="about-modal__title">Headline: Meet the Developer Behind Your Next Career Move</h2>
              <div className="about-modal__body">
                <p>Hello, I'm <strong>Zekirya Sarwary</strong>, a passionate software developer dedicated to building efficient, user-friendly web applications.</p>
                <p>I believe that professional growth should be accessible to everyone. That's why I developed this CV Maker—to bridge the gap between talented individuals and their dream jobs, completely free of charge.</p>
                <p>With this tool, I've combined clean design with easy functionality, aiming to make resume creation stress-free. Your success is my goal. Feel free to use it, share it, and take the next step in your career journey!</p>

                <div className="about-modal__socials">
                  <p className="socials-text">
                    I love connecting with ambitious professionals and tech enthusiasts!
                    If you found this tool helpful, let's keep the conversation going. Join my community below to stay updated on my latest projects, tutorials, and coding insights! 👇
                  </p>
                  <div className="socials-links">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                      📘 Facebook
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                      ▶️ YouTube
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                      💼 LinkedIn
                    </a>
                  </div>
                </div>
              </div>
              <div className="about-modal__footer">
                <button className="btn btn-primary" onClick={() => setIsAboutOpen(false)}>Awesome!</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
