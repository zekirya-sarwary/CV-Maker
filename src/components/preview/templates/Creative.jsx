import './Creative.css'

const fmt = (month) => {
  if (!month) return ''
  const [y, m] = month.split('-')
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${names[parseInt(m,10)-1]} ${y}`
}

export default function Creative({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data

  return (
    <div className="cr-cv">
      {/* Top Header Banner */}
      <header className="cr-header">
        <div className="cr-header__left">
          {personal.photo && <img src={personal.photo} alt={personal.fullName} className="cr-photo" />}
          <div>
            <h1 className="cr-name">{personal.fullName || 'Your Name'}</h1>
            <div className="cr-contacts">
              {personal.email    && <span>{personal.email}</span>}
              {personal.phone    && <span>{personal.phone}</span>}
              {personal.address  && <span>{personal.address}</span>}
            </div>
            <div className="cr-contacts">
              {personal.linkedin  && <span>🔗 {personal.linkedin}</span>}
              {personal.portfolio && <span>🌐 {personal.portfolio}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Two-column body */}
      <div className="cr-body">
        {/* Left column */}
        <div className="cr-left">
          {summary && (
            <section className="cr-section">
              <h2 className="cr-section-title">About Me</h2>
              <p className="cr-text">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section className="cr-section">
              <h2 className="cr-section-title">Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="cr-entry">
                  <div className="cr-entry__dot" />
                  <div className="cr-entry__content">
                    <div className="cr-entry__top">
                      <span className="cr-entry__title">{exp.title}</span>
                      <span className="cr-entry__date">
                        {fmt(exp.start)}{exp.start?' – ':''}{exp.current?'Present':fmt(exp.end)}
                      </span>
                    </div>
                    <span className="cr-entry__sub">{exp.company}{exp.location?` · ${exp.location}`:''}</span>
                    {exp.description && <p className="cr-text cr-desc">{exp.description}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section className="cr-section">
              <h2 className="cr-section-title">Projects</h2>
              {projects.map((p) => (
                <div key={p.id} className="cr-entry">
                  <div className="cr-entry__dot" />
                  <div className="cr-entry__content">
                    <span className="cr-entry__title">{p.title}</span>
                    {p.link && <a href={p.link} className="cr-link">{p.link}</a>}
                    {p.description && <p className="cr-text cr-desc">{p.description}</p>}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="cr-right">
          {education.length > 0 && (
            <section className="cr-section">
              <h2 className="cr-section-title cr-section-title--right">Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="cr-right-entry">
                  <span className="cr-entry__title">{edu.degree}</span>
                  <span className="cr-entry__sub">{edu.institution}</span>
                  {edu.location && <span className="cr-entry__sub">{edu.location}</span>}
                  <span className="cr-entry__date">{fmt(edu.start)}{edu.start?' – ':''}{fmt(edu.end)}</span>
                  {edu.description && <p className="cr-text cr-desc">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}

          {skills.length > 0 && (
            <section className="cr-section">
              <h2 className="cr-section-title cr-section-title--right">Skills</h2>
              <div className="cr-skills">
                {skills.map((s) => (
                  <span key={s.id} className="cr-skill-tag">{s.name}</span>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section className="cr-section">
              <h2 className="cr-section-title cr-section-title--right">Certifications</h2>
              {certifications.map((c) => (
                <div key={c.id} className="cr-right-entry">
                  <span className="cr-entry__title">{c.name}</span>
                  {c.issuer && <span className="cr-entry__sub">{c.issuer}</span>}
                  {c.date && <span className="cr-entry__date">{fmt(c.date)}</span>}
                  {c.description && <p className="cr-text cr-desc">{c.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
