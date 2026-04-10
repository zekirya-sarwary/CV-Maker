import { useCV } from '../../context/CVContext'
import Minimalist from './templates/Minimalist'
import Modern from './templates/Modern'
import Creative from './templates/Creative'
import Corporate from './templates/Corporate'
import Elegant from './templates/Elegant'
import Executive from './templates/Executive'
import './CVPreview.css'

const TEMPLATES = { minimalist: Minimalist, modern: Modern, creative: Creative, corporate: Corporate, elegant: Elegant, executive: Executive }

export default function CVPreview() {
  const { state } = useCV()
  const Template = TEMPLATES[state.meta.template] || Minimalist

  const isEmpty = !state.personal.fullName && !state.summary &&
    state.experience.length === 0 && state.education.length === 0

  return (
    <div className="cv-preview-wrapper">
      <div className="cv-preview-label">
        <span>Live Preview</span>
        <span className="cv-template-badge">{state.meta.template}</span>
      </div>
      <div className="cv-preview-sheet" id="cv-preview-content">
        {isEmpty ? (
          <div className="cv-empty-hint">
            <span>📄</span>
            <p>Start filling in the form to see your CV preview here.</p>
          </div>
        ) : (
          <Template data={state} />
        )}
      </div>
    </div>
  )
}
