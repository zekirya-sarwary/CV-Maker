import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import './FormSteps.css'

export default function Education() {
  const { state, dispatch } = useCV()
  const { education } = state
  const [dragging, setDragging] = useState(null)

  const add = () => dispatch({ type: 'ADD_EDUCATION' })
  const remove = (id) => dispatch({ type: 'REMOVE_EDUCATION', payload: id })
  const update = (id, data) => dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data } })

  const handleDragStart = (id) => setDragging(id)
  const handleDragOver = (e, id) => {
    e.preventDefault()
    if (dragging === id) return
    const from = education.findIndex(e => e.id === dragging)
    const to = education.findIndex(e => e.id === id)
    const updated = [...education]
    const [item] = updated.splice(from, 1)
    updated.splice(to, 0, item)
    dispatch({ type: 'REORDER_EDUCATION', payload: updated })
  }

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">🎓</span>
        <div>
          <h2 className="form-step__title">Education</h2>
          <p className="form-step__sub">Your academic background</p>
        </div>
      </div>

      {education.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__icon">🎓</span>
          <p>No education entries added yet.</p>
        </div>
      )}

      {education.map((edu, idx) => (
        <div key={edu.id} className="entry-card" draggable
          onDragStart={() => handleDragStart(edu.id)}
          onDragOver={(e) => handleDragOver(e, edu.id)}
          onDragEnd={() => setDragging(null)}>
          <div className="entry-card__header">
            <span className="drag-handle">⠿</span>
            <span className="entry-card__index">Education #{idx + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => remove(edu.id)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor={`degree-${edu.id}`}>Degree <span className="required">*</span></label>
              <input id={`degree-${edu.id}`} className="form-input" placeholder="B.Sc. Computer Science" value={edu.degree}
                onChange={(e) => update(edu.id, { degree: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`institution-${edu.id}`}>Institution <span className="required">*</span></label>
              <input id={`institution-${edu.id}`} className="form-input" placeholder="MIT" value={edu.institution}
                onChange={(e) => update(edu.id, { institution: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`edu-location-${edu.id}`}>Location</label>
              <input id={`edu-location-${edu.id}`} className="form-input" placeholder="Cambridge, MA" value={edu.location}
                onChange={(e) => update(edu.id, { location: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`edu-start-${edu.id}`}>Start Year</label>
              <input id={`edu-start-${edu.id}`} className="form-input" type="month" value={edu.start}
                onChange={(e) => update(edu.id, { start: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor={`edu-end-${edu.id}`}>End Year</label>
              <input id={`edu-end-${edu.id}`} className="form-input" type="month" value={edu.end}
                onChange={(e) => update(edu.id, { end: e.target.value })} />
            </div>
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`edu-desc-${edu.id}`}>Description / Achievements</label>
              <textarea id={`edu-desc-${edu.id}`} className="form-input form-textarea"
                placeholder="GPA: 3.9/4.0, Dean's List, relevant coursework..."
                value={edu.description}
                onChange={(e) => update(edu.id, { description: e.target.value })} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary add-btn" onClick={add}>+ Add Education</button>
    </div>
  )
}
