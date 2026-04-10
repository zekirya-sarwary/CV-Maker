import { useCV } from '../../context/CVContext'
import './FormSteps.css'

export default function Projects() {
  const { state, dispatch } = useCV()
  const { projects } = state

  const add = () => dispatch({ type: 'ADD_PROJECT' })
  const remove = (id) => dispatch({ type: 'REMOVE_PROJECT', payload: id })
  const update = (id, data) => dispatch({ type: 'UPDATE_PROJECT', payload: { id, data } })

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">🚀</span>
        <div>
          <h2 className="form-step__title">Projects</h2>
          <p className="form-step__sub">Showcase your notable work</p>
        </div>
      </div>

      {projects.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__icon">🚀</span>
          <p>No projects added yet.</p>
        </div>
      )}

      {projects.map((proj, idx) => (
        <div key={proj.id} className="entry-card">
          <div className="entry-card__header">
            <span className="entry-card__index">Project #{idx + 1}</span>
            <button className="btn btn-danger btn-sm" onClick={() => remove(proj.id)}>Remove</button>
          </div>
          <div className="form-grid">
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`proj-title-${proj.id}`}>Project Title <span className="required">*</span></label>
              <input id={`proj-title-${proj.id}`} className="form-input" placeholder="My Awesome App" value={proj.title}
                onChange={(e) => update(proj.id, { title: e.target.value })} />
            </div>
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`proj-desc-${proj.id}`}>Description</label>
              <textarea id={`proj-desc-${proj.id}`} className="form-input form-textarea"
                placeholder="Built a real-time collaborative whiteboard app using React and WebSockets, supporting 100+ concurrent users."
                value={proj.description}
                onChange={(e) => update(proj.id, { description: e.target.value })} />
            </div>
            <div className="form-group form-grid--full">
              <label className="form-label" htmlFor={`proj-link-${proj.id}`}>Project Link</label>
              <input id={`proj-link-${proj.id}`} className="form-input" type="url" placeholder="https://github.com/you/project"
                value={proj.link}
                onChange={(e) => update(proj.id, { link: e.target.value })} />
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary add-btn" onClick={add}>+ Add Project</button>
    </div>
  )
}
