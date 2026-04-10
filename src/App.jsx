import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { CVProvider } from './context/CVContext'
import Landing from './pages/Landing'
import Builder from './pages/Builder'

export default function App() {
  return (
    <CVProvider>
      <HashRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--surface)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              fontFamily: 'var(--font-sans)',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </HashRouter>
    </CVProvider>
  )
}
