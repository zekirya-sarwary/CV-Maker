import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import './FormSteps.css'

export default function WorkExperience() {
  const { state, dispatch } = useCV()
  const { experience } = state
  const [dragging, setDragging] = useState(null)

  const add = () => dispatch({ type: 'ADD_EXPERIENCE' })
  const remove = (id) => dispatch({ type: 'REMOVE_EXPERIENCE', payload: id })
  const update = (id, data) => dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data } })

  /* drag-and-drop reorder */
  const handleDragStart = (id) => setDragging(id)
  const handleDragOver = (e, id) => {
    e.preventDefault()
    if (dragging === id) return
    const from = experience.findIndex(e => e.id === dragging)
    const to = experience.findIndex(e => e.id === id)
    const updated = [...experience]
    const [item] = updated.splice(from, 1)
    updated.splice(to, 0, item)
    dispatch({ type: 'REORDER_EXPERIENCE', payload: updated })
  }

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">💼</span>
        <div>
          <h2 className="form-step__title">Work Experience</h2>
          <p className="form-step__sub">Add your professional history</p>
        </div>
      </div>

      {experience.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__icon">💼</span>
          <p>No work experience added yet.</p>
        </div>
      )}

      {experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="entry-card"
          draggable
          onDragStart={() => handleDragStart(exp.id)}
          onDragOver={(e) => handleDragOver(e, exp.id)}
          onDragEnd={() => setDragging(null)}
        >
          <div className="entry-card__header">
            <span className="drag-handle" title="Drag to reorder">⠿</span>
            <span className="entry-card__index">Experience #{idx + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => remove(exp.id)}>Remove</button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor={`job-title-${exp.id}`}>Job Title <span className="required">*</span></label>
              <input id={`job-title-${exp.id}`} className="form-input" placeholder="Software Engineer" value={exp.title}
                onChange={(e) => update(exp.id, { title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`company-${exp.id}`}>Company <span className="required">*</span></label>
              <input id={`company-${exp.id}`} className="form-input" placeholder="Acme Corp" value={exp.company}
                onChange={(e) => update(exp.id, { company: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`exp-location-${exp.id}`}>Location</label>
              <input id={`exp-location-${exp.id}`} className="form-input" placeholder="New York, NY" value={exp.location}
                onChange={(e) => update(exp.id, { location: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`exp-start-${exp.id}`}>Start Date</label>
              <input id={`exp-start-${exp.id}`} className="form-input" type="month" value={exp.start}
                onChange={(e) => update(exp.id, { start: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`exp-end-${exp.id}`}>End Date</label>
              <input id={`exp-end-${exp.id}`} className="form-input" type="month" value={exp.end}
                disabled={exp.current}
                onChange={(e) => update(exp.id, { end: e.target.value })} />
            </div>
            <div className="form-group form-check">
              <label className="check-label">
                <input type="checkbox" checked={exp.current}
                  onChange={(e) => update(exp.id, { current: e.target.checked, end: '' })} />
                Currently working here
              </label>
            </div>
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`exp-desc-${exp.id}`}>Description</label>
              <textarea id={`exp-desc-${exp.id}`} className="form-input form-textarea"
                placeholder="• Led development of key features&#10;• Reduced load time by 40%&#10;• Mentored junior developers"
                value={exp.description}
                onChange={(e) => update(exp.id, { description: e.target.value })} />
              <p className="form-hint">Use bullet points (•) for clarity</p>
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary add-btn" onClick={add}>
        + Add Work Experience
      </button>
    </div>
  )
}
