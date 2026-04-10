import { useRef } from 'react'
import { useCV } from '../../context/CVContext'
import './FormSteps.css'

export default function PersonalInfo() {
  const { state, dispatch } = useCV()
  const { personal } = state
  const fileRef = useRef()

  const set = (field, value) =>
    dispatch({ type: 'SET_PERSONAL', payload: { [field]: value } })

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => set('photo', ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="form-step">
      <div className="form-step__header">
        <span className="form-step__icon">👤</span>
        <div>
          <h2 className="form-step__title">Personal Information</h2>
          <p className="form-step__sub">Your basic contact details</p>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="photo-upload-area" onClick={() => fileRef.current.click()}>
        {personal.photo ? (
          <img src={personal.photo} alt="Profile" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <span className="photo-placeholder__icon">📷</span>
            <span className="photo-placeholder__text">Upload Photo</span>
            <span className="photo-placeholder__hint">Click to browse</span>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handlePhoto}
          style={{ display: 'none' }}
          id="photo-input"
        />
        {personal.photo && (
          <button
            className="photo-remove"
            onClick={(e) => { e.stopPropagation(); set('photo', null) }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="form-grid">
        <div className="form-group form-grid--full">
          <label className="form-label" htmlFor="fullName">Full Name <span className="required">*</span></label>
          <input
            id="fullName"
            className="form-input"
            type="text"
            placeholder="e.g. Alex Johnson"
            value={personal.fullName}
            onChange={(e) => set('fullName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email <span className="required">*</span></label>
          <input
            id="email"
            className="form-input"
            type="email"
            placeholder="alex@example.com"
            value={personal.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="form-input"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={personal.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>

        <div className="form-group form-grid--full">
          <label className="form-label" htmlFor="address">Address / Location</label>
          <input
            id="address"
            className="form-input"
            type="text"
            placeholder="New York, NY, USA"
            value={personal.address}
            onChange={(e) => set('address', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="linkedin">LinkedIn URL</label>
          <input
            id="linkedin"
            className="form-input"
            type="url"
            placeholder="linkedin.com/in/alexjohnson"
            value={personal.linkedin}
            onChange={(e) => set('linkedin', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="portfolio">Portfolio / Website</label>
          <input
            id="portfolio"
            className="form-input"
            type="url"
            placeholder="alexjohnson.dev"
            value={personal.portfolio}
            onChange={(e) => set('portfolio', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
