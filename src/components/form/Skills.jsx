import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import './FormSteps.css'

const LEVEL_LABELS = ['', 'Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert']

export default function Skills() {
  const { state, dispatch } = useCV()
  const { skills } = state
  const [input, setInput] = useState('')

  const addSkill = () => {
    const name = input.trim()
    if (!name) return
    dispatch({ type: 'ADD_SKILL', payload: name })
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addSkill()
    }
  }

  const updateLevel = (id, level) =>
    dispatch({ type: 'UPDATE_SKILL', payload: { id, data: { level: Number(level) } } })

  const remove = (id) => dispatch({ type: 'REMOVE_SKILL', payload: id })

  const SUGGESTIONS = ['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'SQL', 'Figma', 'Docker', 'AWS', 'Git']

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">⚡</span>
        <div>
          <h2 className="form-step__title">Skills</h2>
          <p className="form-step__sub">Add your technical and soft skills</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="skill-input">Add Skill</label>
        <div className="skill-input-row">
          <input
            id="skill-input"
            className="form-input"
            placeholder="Type a skill and press Enter"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="btn btn-primary" onClick={addSkill}>Add</button>
        </div>
        <p className="form-hint">Press Enter or comma to add · Click × to remove</p>
      </div>

      {/* Suggestions */}
      <div className="skill-suggestions">
        {SUGGESTIONS.filter(s => !skills.find(sk => sk.name.toLowerCase() === s.toLowerCase())).map(s => (
          <button key={s} className="suggestion-chip"
            onClick={() => dispatch({ type: 'ADD_SKILL', payload: s })}>
            + {s}
          </button>
        ))}
      </div>

      {/* Skill list */}
      {skills.length > 0 && (
        <div className="skills-list">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-item">
              <div className="skill-item__top">
                <span className="skill-item__name">{skill.name}</span>
                <div className="skill-item__actions">
                  <span className="skill-level-label">{LEVEL_LABELS[skill.level]}</span>
                  <button className="remove-btn" onClick={() => remove(skill.id)}>×</button>
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={skill.level}
                className="skill-slider"
                onChange={(e) => updateLevel(skill.id, e.target.value)}
                aria-label={`${skill.name} proficiency`}
              />
              <div className="skill-dots">
                {[1,2,3,4,5].map(d => (
                  <span key={d} className={`skill-dot ${d <= skill.level ? 'filled' : ''}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && (
        <div className="empty-state">
          <span className="empty-state__icon">⚡</span>
          <p>No skills added yet.</p>
        </div>
      )}
    </div>
  )
}
