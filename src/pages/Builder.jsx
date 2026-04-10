import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCV } from '../context/CVContext'
import StepNav from '../components/form/StepNav'
import PersonalInfo from '../components/form/PersonalInfo'
import Summary from '../components/form/Summary'
import WorkExperience from '../components/form/WorkExperience'
import Education from '../components/form/Education'
import Skills from '../components/form/Skills'
import Projects from '../components/form/Projects'
import Certifications from '../components/form/Certifications'
import ExportStep from '../components/form/ExportStep'
import CVPreview from '../components/preview/CVPreview'
import toast from 'react-hot-toast'
import './Builder.css'

const STEPS = [
  { id: 'personal',       label: 'Personal',        icon: '👤' },
  { id: 'summary',        label: 'Summary',          icon: '📝' },
  { id: 'experience',     label: 'Experience',       icon: '💼' },
  { id: 'education',      label: 'Education',        icon: '🎓' },
  { id: 'skills',         label: 'Skills',           icon: '⚡' },
  { id: 'projects',       label: 'Projects',         icon: '🚀' },
  { id: 'certifications', label: 'Certifications',   icon: '🏅' },
  { id: 'export',         label: 'Export',           icon: '📥' },
]

const STEP_COMPONENTS = {
  personal:       PersonalInfo,
  summary:        Summary,
  experience:     WorkExperience,
  education:      Education,
  skills:         Skills,
  projects:       Projects,
  certifications: Certifications,
  export:         ExportStep,
}

export default function Builder() {
  const navigate = useNavigate()
  const { state, dispatch, resetCV } = useCV()
  const [currentStep, setCurrentStep] = useState(0)
  const [mobileTab, setMobileTab] = useState('form') // 'form' | 'preview'

  const StepComponent = STEP_COMPONENTS[STEPS[currentStep].id]

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1)
  }
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
  }
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      resetCV()
      setCurrentStep(0)
      toast.success('CV data cleared')
    }
  }

  return (
    <div className="builder">
      {/* Top Bar */}
      <header className="builder-header no-print">
        <div className="builder-header__left">
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/')} aria-label="Go home">
            ← Back
          </button>
          <div className="landing-logo">
            <span className="landing-logo__icon">✦</span>
            <span className="landing-logo__text">CV Maker</span>
          </div>
        </div>
        <div className="builder-header__right">
          <div className="builder-mobile-tabs">
            <button
              className={`mobile-tab ${mobileTab === 'form' ? 'active' : ''}`}
              onClick={() => setMobileTab('form')}
            >
              📝 Form
            </button>
            <button
              className={`mobile-tab ${mobileTab === 'preview' ? 'active' : ''}`}
              onClick={() => setMobileTab('preview')}
            >
              👁 Preview
            </button>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
            aria-label="Toggle dark mode"
          >
            {state.meta.darkMode ? '☀️' : '🌙'}
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleReset}>
            Reset
          </button>
        </div>
      </header>

      <div className="builder-body">
        {/* LEFT – Form */}
        <aside className={`builder-form no-print ${mobileTab === 'preview' ? 'hide-mobile' : ''}`}>
          <StepNav steps={STEPS} currentStep={currentStep} onStep={setCurrentStep} />
          <div className="builder-form__content">
            <div className="step-animate" key={currentStep}>
              <StepComponent />
            </div>
          </div>
          <div className="builder-form__footer">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              ← Previous
            </button>
            <span className="step-counter">
              {currentStep + 1} / {STEPS.length}
            </span>
            {currentStep < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next →
              </button>
            ) : null}
          </div>
        </aside>

        {/* RIGHT – Preview */}
        <main className={`builder-preview ${mobileTab === 'form' ? 'hide-mobile' : ''}`}>
          <div className="builder-preview__inner">
            <CVPreview />
          </div>
        </main>
      </div>
    </div>
  )
}
