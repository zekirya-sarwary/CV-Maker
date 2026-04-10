import './Minimalist.css'

const fmt = (month) => {
  if (!month) return ''
  const [y, m] = month.split('-')
  const names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${names[parseInt(m,10)-1]} ${y}`
}

export default function Minimalist({ data }) {
  const { personal, summary, experience, education, skills, projects, certifications } = data

  return (
    <div className="mn">
      {/* Header */}
      <header className="mn-header">
        {personal.photo && <img src={personal.photo} alt={personal.fullName} className="mn-photo" />}
        <div className="mn-header__info">
          <h1 className="mn-name">{personal.fullName || 'Your Name'}</h1>
          <div className="mn-contacts">
            {personal.email    && <span>✉ {personal.email}</span>}
            {personal.phone    && <span>📞 {personal.phone}</span>}
            {personal.address  && <span>📍 {personal.address}</span>}
            {personal.linkedin && <span>🔗 {personal.linkedin}</span>}
            {personal.portfolio && <span>🌐 {personal.portfolio}</span>}
          </div>
        </div>
      </header>

      <div className="mn-body">
        {/* Summary */}
        {summary && (
          <section className="mn-section">
            <h2 className="mn-section-title">Profile</h2>
            <p className="mn-text">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mn-section">
            <h2 className="mn-section-title">Work Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mn-entry">
                <div className="mn-entry__head">
                  <div>
                    <span className="mn-entry__title">{exp.title}</span>
                    <span className="mn-entry__company"> · {exp.company}</span>
                    {exp.location && <span className="mn-entry__location">, {exp.location}</span>}
                  </div>
                  <span className="mn-entry__date">
                    {fmt(exp.start)}{exp.start ? ' – ' : ''}{exp.current ? 'Present' : fmt(exp.end)}
                  </span>
                </div>
                {exp.description && (
                  <p className="mn-text mn-desc">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mn-section">
            <h2 className="mn-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="mn-entry">
                <div className="mn-entry__head">
                  <div>
                    <span className="mn-entry__title">{edu.degree}</span>
                    <span className="mn-entry__company"> · {edu.institution}</span>
                    {edu.location && <span className="mn-entry__location">, {edu.location}</span>}
                  </div>
                  <span className="mn-entry__date">
                    {fmt(edu.start)}{edu.start ? ' – ' : ''}{fmt(edu.end)}
                  </span>
                </div>
                {edu.description && <p className="mn-text mn-desc">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mn-section">
            <h2 className="mn-section-title">Skills</h2>
            <div className="mn-skills">
              {skills.map((s) => (
                <span key={s.id} className="mn-skill-tag">{s.name}</span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mn-section">
            <h2 className="mn-section-title">Projects</h2>
            {projects.map((p) => (
              <div key={p.id} className="mn-entry">
                <div className="mn-entry__head">
                  <span className="mn-entry__title">{p.title}</span>
                  {p.link && <a href={p.link} className="mn-link">{p.link}</a>}
                </div>
                {p.description && <p className="mn-text mn-desc">{p.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mn-section">
            <h2 className="mn-section-title">Certifications & Awards</h2>
            {certifications.map((c) => (
              <div key={c.id} className="mn-entry">
                <div className="mn-entry__head">
                  <div>
                    <span className="mn-entry__title">{c.name}</span>
                    {c.issuer && <span className="mn-entry__company"> · {c.issuer}</span>}
                  </div>
                  {c.date && <span className="mn-entry__date">{fmt(c.date)}</span>}
                </div>
                {c.description && <p className="mn-text mn-desc">{c.description}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
