import './Elegant.css'

const fmt = (month) => {
  if (!month) return ''
  const [y, m] = month.split('-')
  const names = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${names[parseInt(m,10)-1]} ${y}`
}

export default function Elegant({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data

  return (
    <div className="el">
      {/* Header */}
      <header className="el-header">
        {personal.photo && <img src={personal.photo} alt={personal.fullName} className="el-photo" />}
        <div className="el-header__info">
          <h1 className="el-name">{personal.fullName || 'Your Name'}</h1>
          <div className="el-contacts">
            {personal.email    && <span>{personal.email}</span>}
            {personal.phone    && <span>{personal.phone}</span>}
            {personal.address  && <span>{personal.address}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.portfolio && <span>{personal.portfolio}</span>}
          </div>
        </div>
      </header>

      <div className="el-body">
        {/* Summary */}
        {summary && (
          <section className="el-section">
            <h2 className="el-section-title">Professional Summary</h2>
            <p className="el-text">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="el-section">
            <h2 className="el-section-title">Professional Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="el-entry">
                <div className="el-entry__head">
                  <div className="el-entry__main">
                    <span className="el-entry__title">{exp.title}</span>
                    <span className="el-entry__company">, {exp.company}</span>
                    {exp.location && <span className="el-entry__location"> — {exp.location}</span>}
                  </div>
                  <span className="el-entry__date">
                    {fmt(exp.start)}{exp.start ? ' – ' : ''}{exp.current ? 'Present' : fmt(exp.end)}
                  </span>
                </div>
                {exp.description && (
                  <p className="el-text el-desc">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="el-section">
            <h2 className="el-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="el-entry">
                <div className="el-entry__head">
                  <div className="el-entry__main">
                    <span className="el-entry__title">{edu.degree}</span>
                    <span className="el-entry__company">, {edu.institution}</span>
                    {edu.location && <span className="el-entry__location"> — {edu.location}</span>}
                  </div>
                  <span className="el-entry__date">
                    {fmt(edu.start)}{edu.start ? ' – ' : ''}{fmt(edu.end)}
                  </span>
                </div>
                {edu.description && <p className="el-text el-desc">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="el-section">
            <h2 className="el-section-title">Projects & Portfolio</h2>
            {projects.map((p) => (
              <div key={p.id} className="el-entry">
                <div className="el-entry__head">
                  <span className="el-entry__title">{p.title}</span>
                  {p.link && <a href={p.link} className="el-link">{p.link}</a>}
                </div>
                {p.description && <p className="el-text el-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills & Certifications */}
        {(skills.length > 0 || certifications.length > 0) && (
          <div className="el-grid">
            {skills.length > 0 && (
              <section className="el-section">
                <h2 className="el-section-title">Core Competencies</h2>
                <div className="el-skills">
                  {skills.map((s) => (
                    <span key={s.id} className="el-skill-tag">{s.name}</span>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section className="el-section">
                <h2 className="el-section-title">Certifications</h2>
                {certifications.map((c) => (
                  <div key={c.id} className="el-entry el-entry--compact">
                    <div className="el-entry__head">
                      <div>
                        <span className="el-entry__title">{c.name}</span>
                        {c.issuer && <span className="el-entry__company"> ({c.issuer})</span>}
                      </div>
                      {c.date && <span className="el-entry__date">{fmt(c.date)}</span>}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
