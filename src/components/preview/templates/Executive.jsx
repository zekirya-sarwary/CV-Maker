import './Executive.css'

const fmt = (month) => {
  if (!month) return ''
  const [y, m] = month.split('-')
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${names[parseInt(m,10)-1]} ${y}`
}

export default function Executive({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data

  return (
    <div className="ex">
      {/* Header */}
      <header className="ex-header">
        <div className="ex-header__content">
          <div className="ex-header__name-box">
            <h1 className="ex-name">{personal.fullName || 'Your Name'}</h1>
            {personal.email && <div className="ex-contact-item"><span>Email</span> {personal.email}</div>}
            {personal.phone && <div className="ex-contact-item"><span>Phone</span> {personal.phone}</div>}
            {personal.address && <div className="ex-contact-item"><span>Location</span> {personal.address}</div>}
            {personal.linkedin && <div className="ex-contact-item"><span>LinkedIn</span> {personal.linkedin}</div>}
            {personal.portfolio && <div className="ex-contact-item"><span>Portfolio</span> {personal.portfolio}</div>}
          </div>
          {personal.photo && <img src={personal.photo} alt="Profile" className="ex-photo" />}
        </div>
      </header>

      <div className="ex-body">
        {/* Summary */}
        {summary && (
          <section className="ex-section">
            <h2 className="ex-section-title">Executive Summary</h2>
            <div className="ex-section-content">
              <p className="ex-text">{summary}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="ex-section">
            <h2 className="ex-section-title">Key Experience</h2>
            <div className="ex-section-content">
              {experience.map((exp) => (
                <div key={exp.id} className="ex-entry">
                  <div className="ex-entry__head">
                    <span className="ex-entry__title">{exp.title}</span>
                    <span className="ex-entry__date">
                      {fmt(exp.start)}{exp.start ? ' – ' : ''}{exp.current ? 'Present' : fmt(exp.end)}
                    </span>
                  </div>
                  <div className="ex-entry__meta">
                    <span className="ex-entry__company">{exp.company}</span>
                    {exp.location && <span className="ex-entry__location"> | {exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="ex-text ex-desc">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="ex-section">
            <h2 className="ex-section-title">Education</h2>
            <div className="ex-section-content">
              {education.map((edu) => (
                <div key={edu.id} className="ex-entry">
                  <div className="ex-entry__head">
                    <span className="ex-entry__title">{edu.degree}</span>
                    <span className="ex-entry__date">
                      {fmt(edu.start)}{edu.start ? ' – ' : ''}{fmt(edu.end)}
                    </span>
                  </div>
                  <div className="ex-entry__meta">
                    <span className="ex-entry__company">{edu.institution}</span>
                    {edu.location && <span className="ex-entry__location"> | {edu.location}</span>}
                  </div>
                  {edu.description && <p className="ex-text ex-desc">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="ex-section">
            <h2 className="ex-section-title">Strategic Projects</h2>
            <div className="ex-section-content">
              {projects.map((p) => (
                <div key={p.id} className="ex-entry">
                  <div className="ex-entry__head">
                    <span className="ex-entry__title">{p.title}</span>
                    {p.link && <a href={p.link} className="ex-link">{p.link}</a>}
                  </div>
                  {p.description && <p className="ex-text ex-desc">{p.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Competencies & Certifications */}
        <section className="ex-section ex-split-section">
          {skills.length > 0 && (
            <div className="ex-split-col">
              <h2 className="ex-section-title">Competencies</h2>
              <ul className="ex-skill-list">
                {skills.map((s) => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            </div>
          )}
          {certifications.length > 0 && (
            <div className="ex-split-col">
              <h2 className="ex-section-title">Certifications</h2>
              <div className="ex-cert-list">
                {certifications.map((c) => (
                  <div key={c.id} className="ex-cert-item">
                    <div className="ex-cert-title">{c.name}</div>
                    <div className="ex-cert-meta">
                      {c.issuer && <span>{c.issuer}</span>}
                      {c.date && <span> ({fmt(c.date)})</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
