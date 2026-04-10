import { useCV } from '../../context/CVContext'
import './FormSteps.css'

export default function Certifications() {
  const { state, dispatch } = useCV()
  const { certifications } = state

  const add = () => dispatch({ type: 'ADD_CERTIFICATION' })
  const remove = (id) => dispatch({ type: 'REMOVE_CERTIFICATION', payload: id })
  const update = (id, data) => dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, data } })

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">🏅</span>
        <div>
          <h2 className="form-step__title">Certifications & Awards</h2>
          <p className="form-step__sub">Highlight your achievements</p>
        </div>
      </div>

      {certifications.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__icon">🏅</span>
          <p>No certifications added yet.</p>
        </div>
      )}

      {certifications.map((cert, idx) => (
        <div key={cert.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__index">Certification #{idx + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => remove(cert.id)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`cert-name-${cert.id}`}>Name <span className="required">*</span></label>
              <input id={`cert-name-${cert.id}`} className="form-input" placeholder="AWS Certified Solutions Architect" value={cert.name}
                onChange={(e) => update(cert.id, { name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`cert-issuer-${cert.id}`}>Issuer</label>
              <input id={`cert-issuer-${cert.id}`} className="form-input" placeholder="Amazon Web Services" value={cert.issuer}
                onChange={(e) => update(cert.id, { issuer: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`cert-date-${cert.id}`}>Date</label>
              <input id={`cert-date-${cert.id}`} className="form-input" type="month" value={cert.date}
                onChange={(e) => update(cert.id, { date: e.target.value })} />
            </div>
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`cert-desc-${cert.id}`}>Description</label>
              <textarea id={`cert-desc-${cert.id}`} className="form-input form-textarea"
                placeholder="Brief description of the certification or award..."
                value={cert.description}
                onChange={(e) => update(cert.id, { description: e.target.value })} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary add-btn" onClick={add}>+ Add Certification</button>
    </div>
  )
}
