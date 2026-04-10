import { useState } from 'react'
import { useCV } from '../../context/CVContext'
import { useExportPDF } from '../../services/pdfExport'
import toast from 'react-hot-toast'
import './FormSteps.css'

const TEMPLATES = [
  { id: 'minimalist', label: 'Minimalist', emoji: '🪶', desc: 'Clean serif, timeless elegance', color: '#475569' },
  { id: 'modern',     label: 'Modern',     emoji: '⚡', desc: 'Bold & vibrant sidebar',       color: '#6366f1' },
  { id: 'creative',   label: 'Creative',   emoji: '🎨', desc: 'Two-column, colorful blocks', color: '#0ea5e9' },
  { id: 'corporate',  label: 'Corporate',  emoji: '🏢', desc: 'Classic authoritative style',  color: '#155e75' },
  { id: 'elegant',    label: 'Elegant',    emoji: '✨', desc: 'Sleek, high-end, serif focus', color: '#8b5cf6' },
  { id: 'executive',  label: 'Executive',  emoji: '👔', desc: 'Dense grid, formal structure', color: '#1a293b' },
]

export default function ExportStep() {
  const { state, dispatch } = useCV()
  const { exportPDF } = useExportPDF()
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    const name = state.personal.fullName || 'my-cv'
    const filename = `${name.toLowerCase().replace(/\s+/g, '-')}-cv.pdf`
    toast.loading('Generating PDF…', { id: 'pdf' })
    try {
      await exportPDF('cv-preview-content', filename)
      toast.success('PDF downloaded!', { id: 'pdf' })
    } catch {
      toast.error('Export failed. Please try again.', { id: 'pdf' })
    } finally {
      setExporting(false)
    }
  }

  const handlePrint = () => window.print()

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">📥</span>
        <div>
          <h2 className="form-step__title">Export Your CV</h2>
          <p className="form-step__sub">Choose a template and download</p>
        </div>
      </div>

      {/* Template Picker */}
      <div className="form-group">
        <label className="form-label">Choose Template</label>
        <div className="template-picker">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              className={`template-option ${state.meta.template === t.id ? 'active' : ''}`}
              style={{ '--tcolor': t.color }}
              onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })}
            >
              <span className="template-option__emoji">{t.emoji}</span>
              <span className="template-option__label">{t.label}</span>
              <span className="template-option__desc">{t.desc}</span>
              {state.meta.template === t.id && <span className="template-option__check">✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="divider" />

      {/* Export Buttons */}
      <div className="export-actions">
        <button
          id="export-pdf-btn"
          className="btn btn-primary btn-lg"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? '⏳ Generating…' : '⬇ Download PDF'}
        </button>
        <button
          id="print-btn"
          className="btn btn-secondary btn-lg"
          onClick={handlePrint}
        >
          🖨 Print CV
        </button>
      </div>

      <div className="divider" />

      {/* Summary checklist */}
      <div className="export-checklist">
        <p className="form-label" style={{ marginBottom: 12 }}>CV Completion</p>
        {[
          { label: 'Full Name',   done: !!state.personal.fullName },
          { label: 'Email',       done: !!state.personal.email },
          { label: 'Summary',     done: !!state.summary },
          { label: 'Experience',  done: state.experience.length > 0 },
          { label: 'Education',   done: state.education.length > 0 },
          { label: 'Skills',      done: state.skills.length > 0 },
        ].map(({ label, done }) => (
          <div key={label} className="checklist-item">
            <span className={`checklist-icon ${done ? 'done' : 'missing'}`}>{done ? '✓' : '○'}</span>
            <span className={done ? '' : 'text-muted'}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
