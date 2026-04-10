import { useCV } from '../../context/CVContext'
import './FormSteps.css'

const MAX = 600

export default function Summary() {
  const { state, dispatch } = useCV()

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">📝</span>
        <div>
          <h2 className="form-step__title">Professional Summary</h2>
          <p className="form-step__sub">A brief overview of your career</p>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="summary">Career Objective / Summary</label>
        <textarea
          id="summary"
          className="form-input form-textarea"
          style={{ minHeight: 160 }}
          placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and delivering exceptional user experiences..."
          value={state.summary}
          maxLength={MAX}
          onChange={(e) => dispatch({ type: 'SET_SUMMARY', payload: e.target.value })}
        />
        <p className="form-hint" style={{ textAlign: 'right' }}>
          {state.summary.length} / {MAX} characters
        </p>
      </div>

      <div className="tips-box">
        <p className="tips-box__title">✨ Tips for a great summary</p>
        <ul className="tips-box__list">
          <li>Keep it to 3–5 sentences</li>
          <li>Highlight your top skills and experiences</li>
          <li>Tailor it to the job you're applying for</li>
          <li>Use strong action words</li>
        </ul>
      </div>
    </div>
  )
}
