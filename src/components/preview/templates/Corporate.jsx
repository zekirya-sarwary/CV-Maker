import './Corporate.css'

const fmt = (month) => {
  if (!month) return ''
  const [y, m] = month.split('-')
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${names[parseInt(m,10)-1]} ${y}`
}

export default function Corporate({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data

  return (
    <div className="co-cv">
      {/* Header */}
      <header className="co-header">
        <div className="co-header__top">
          <div className="co-header__info">
            <h1 className="co-name">{personal.fullName || 'Your Name'}</h1>
          </div>
          {personal.photo && (
            <img src={personal.photo} alt={personal.fullName} className="co-photo" />
          )}
        </div>
        <div className="co-contacts">
          {personal.email    && <span className="co-contact">✉ {personal.email}</span>}
          {personal.phone    && <span className="co-contact">📞 {personal.phone}</span>}
          {personal.address  && <span className="co-contact">📍 {personal.address}</span>}
          {personal.linkedin && <span className="co-contact">🔗 {personal.linkedin}</span>}
          {personal.portfolio && <span className="co-contact">🌐 {personal.portfolio}</span>}
        </div>
      </header>

      <div className="co-body">
        {/* Summary */}
        {summary && (
          <section className="co-section">
            <h2 className="co-section-title">Executive Summary</h2>
            <p className="co-text">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="co-section">
            <h2 className="co-section-title">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="co-entry">
                <div className="co-entry__header">
                  <div>
                    <span className="co-entry__title">{exp.title}</span>
                    <span className="co-entry__company">{exp.company}{exp.location ? ` · ${exp.location}` : ''}</span>
                  </div>
                  <span className="co-entry__date">
                    {fmt(exp.start)}{exp.start ? ' – ' : ''}{exp.current ? 'Present' : fmt(exp.end)}
                  </span>
                </div>
                {exp.description && <p className="co-text co-desc">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Two column: Education + Skills */}
        <div className="co-two-col">
          {education.length > 0 && (
            <section className="co-section">
              <h2 className="co-section-title">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="co-entry">
                  <div className="co-entry__header">
                    <div>
                      <span className="co-entry__title">{edu.degree}</span>
                      <span className="co-entry__company">{edu.institution}{edu.location ? ` · ${edu.location}` : ''}</span>
                    </div>
                    <span className="co-entry__date">
                      {fmt(edu.start)}{edu.start ? ' – ' : ''}{fmt(edu.end)}
                    </span>
                  </div>
                  {edu.description && <p className="co-text co-desc">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="co-section">
              <h2 className="co-section-title">Core Competencies</h2>
              <div className="co-skills">
                {skills.map((s) => (
                  <span key={s.id} className="co-skill">{s.name}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects */}
        {projects.length > 0 && (
          <section className="co-section">
            <h2 className="co-section-title">Key Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="co-entry">
                <div className="co-entry__header">
                  <span className="co-entry__title">{p.title}</span>
                  {p.link && <a href={p.link} className="co-link">{p.link}</a>}
                </div>
                {p.description && <p className="co-text co-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="co-section">
            <h2 className="co-section-title">Certifications & Awards</h2>
            <div className="co-certs">
              {certifications.map((c) => (
                <div key={c.id} className="co-cert">
                  <span className="co-cert__name">{c.name}</span>
                  {c.issuer && <span className="co-cert__issuer">{c.issuer}</span>}
                  {c.date && <span className="co-cert__date">{fmt(c.date)}</span>}
                  {c.description && <p className="co-text co-desc">{c.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
