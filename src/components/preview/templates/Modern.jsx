import './Modern.css'

const fmt = (month) => {
  if (!month) return ''
  const [y, m] = month.split('-')
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${names[parseInt(m,10)-1]} ${y}`
}

const LEVEL_PCT = { 1: '20%', 2: '40%', 3: '60%', 4: '80%', 5: '100%' }

export default function Modern({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data

  return (
    <div className="md-cv">
      {/* Sidebar */}
      <aside className="md-sidebar">
        {personal.photo && (
          <div className="md-photo-wrap">
            <img src={personal.photo} alt={personal.fullName} className="md-photo" />
          </div>
        )}

        <h1 className="md-name">{personal.fullName || 'Your Name'}</h1>

        {/* Contact */}
        <div className="md-sidebar-section">
          <h3 className="md-sidebar-title">Contact</h3>
          {personal.email    && <p className="md-contact-item">✉ {personal.email}</p>}
          {personal.phone    && <p className="md-contact-item">📞 {personal.phone}</p>}
          {personal.address  && <p className="md-contact-item">📍 {personal.address}</p>}
          {personal.linkedin && <p className="md-contact-item">🔗 {personal.linkedin}</p>}
          {personal.portfolio && <p className="md-contact-item">🌐 {personal.portfolio}</p>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="md-sidebar-section">
            <h3 className="md-sidebar-title">Skills</h3>
            {skills.map((s) => (
              <div key={s.id} className="md-skill">
                <span className="md-skill__name">{s.name}</span>
                <div className="md-skill__bar">
                  <div className="md-skill__fill" style={{ width: LEVEL_PCT[s.level] || '60%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications in sidebar */}
        {certifications.length > 0 && (
          <div className="md-sidebar-section">
            <h3 className="md-sidebar-title">Certifications</h3>
            {certifications.map((c) => (
              <div key={c.id} className="md-cert">
                <span className="md-cert__name">{c.name}</span>
                {c.issuer && <span className="md-cert__issuer">{c.issuer}</span>}
                {c.date && <span className="md-cert__date">{fmt(c.date)}</span>}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main */}
      <main className="md-main">
        {/* Summary */}
        {summary && (
          <section className="md-section">
            <h2 className="md-section-title">Profile</h2>
            <p className="md-text">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="md-section">
            <h2 className="md-section-title">Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="md-entry">
                <div className="md-entry__accent" />
                <div className="md-entry__body">
                  <div className="md-entry__head">
                    <span className="md-entry__title">{exp.title}</span>
                    <span className="md-entry__date">
                      {fmt(exp.start)}{exp.start ? ' – ' : ''}{exp.current ? 'Present' : fmt(exp.end)}
                    </span>
                  </div>
                  <span className="md-entry__sub">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</span>
                  {exp.description && <p className="md-text md-desc">{exp.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="md-section">
            <h2 className="md-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="md-entry">
                <div className="md-entry__accent" />
                <div className="md-entry__body">
                  <div className="md-entry__head">
                    <span className="md-entry__title">{edu.degree}</span>
                    <span className="md-entry__date">
                      {fmt(edu.start)}{edu.start ? ' – ' : ''}{fmt(edu.end)}
                    </span>
                  </div>
                  <span className="md-entry__sub">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</span>
                  {edu.description && <p className="md-text md-desc">{edu.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="md-section">
            <h2 className="md-section-title">Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="md-entry">
                <div className="md-entry__accent" />
                <div className="md-entry__body">
                  <div className="md-entry__head">
                    <span className="md-entry__title">{p.title}</span>
                    {p.link && <a href={p.link} className="md-link">{p.link}</a>}
                  </div>
                  {p.description && <p className="md-text md-desc">{p.description}</p>}
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
