import './StepNav.css'

export default function StepNav({ steps, currentStep, onStep }) {
  return (
    <nav className="step-nav" aria-label="Form steps">
      <div className="step-nav__track">
        {steps.map((step, idx) => {
          const status = idx < currentStep ? 'done' : idx === currentStep ? 'active' : 'pending'
          return (
            <button
              key={step.id}
              className={`step-nav__item step-nav__item--${status}`}
              onClick={() => onStep(idx)}
              aria-current={status === 'active' ? 'step' : undefined}
              title={step.label}
            >
              <span className="step-nav__icon">
                {status === 'done' ? '✓' : step.icon}
              </span>
              <span className="step-nav__label">{step.label}</span>
              {idx < steps.length - 1 && (
                <span className={`step-nav__connector ${status === 'done' ? 'done' : ''}`} />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
