import { createContext, useContext, useEffect, useReducer, useCallback } from 'react'

/* ─── Initial State ─── */
export const initialState = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    photo: null,
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  meta: {
    template: 'minimalist',
    darkMode: false,
  },
}

/* ─── Helpers ─── */
const uid = () => Math.random().toString(36).slice(2, 9)

/* ─── Reducer ─── */
function cvReducer(state, action) {
  switch (action.type) {
    case 'SET_PERSONAL':
      return { ...state, personal: { ...state.personal, ...action.payload } }

    case 'SET_SUMMARY':
      return { ...state, summary: action.payload }

    /* Experience */
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [
          ...state.experience,
          { id: uid(), title: '', company: '', location: '', start: '', end: '', current: false, description: '' },
        ],
      }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload.data } : e
        ),
      }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter(e => e.id !== action.payload) }
    case 'REORDER_EXPERIENCE':
      return { ...state, experience: action.payload }

    /* Education */
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [
          ...state.education,
          { id: uid(), degree: '', institution: '', location: '', start: '', end: '', description: '' },
        ],
      }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload.data } : e
        ),
      }
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter(e => e.id !== action.payload) }
    case 'REORDER_EDUCATION':
      return { ...state, education: action.payload }

    /* Skills */
    case 'ADD_SKILL':
      return {
        ...state,
        skills: [...state.skills, { id: uid(), name: action.payload, level: 3 }],
      }
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload.data } : s
        ),
      }
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter(s => s.id !== action.payload) }

    /* Projects */
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { id: uid(), title: '', description: '', link: '' },
        ],
      }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      }
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter(p => p.id !== action.payload) }

    /* Certifications */
    case 'ADD_CERTIFICATION':
      return {
        ...state,
        certifications: [
          ...state.certifications,
          { id: uid(), name: '', issuer: '', date: '', description: '' },
        ],
      }
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        ),
      }
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter(c => c.id !== action.payload) }

    /* Meta */
    case 'SET_TEMPLATE':
      return { ...state, meta: { ...state.meta, template: action.payload } }
    case 'TOGGLE_DARK':
      return { ...state, meta: { ...state.meta, darkMode: !state.meta.darkMode } }

    /* Bulk */
    case 'LOAD_STATE':
      return action.payload

    case 'RESET':
      return initialState

    default:
      return state
  }
}

/* ─── Context ─── */
const CVContext = createContext(null)

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('cv-maker-data')
      return saved ? JSON.parse(saved) : init
    } catch {
      return init
    }
  })

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('cv-maker-data', JSON.stringify(state))
  }, [state])

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      state.meta.darkMode ? 'dark' : 'light'
    )
  }, [state.meta.darkMode])

  const resetCV = useCallback(() => dispatch({ type: 'RESET' }), [])

  return (
    <CVContext.Provider value={{ state, dispatch, resetCV }}>
      {children}
    </CVContext.Provider>
  )
}

export function useCV() {
  const ctx = useContext(CVContext)
  if (!ctx) throw new Error('useCV must be used within CVProvider')
  return ctx
}
