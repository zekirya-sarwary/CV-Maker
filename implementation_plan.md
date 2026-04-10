# CV Maker — Professional Resume Generator

A complete, production-ready web application for generating professional CVs with live preview, multiple templates, and PDF export.

---

## Overview

A React + Vite single-page application with a split-pane layout: a multi-step form on the left and a live-updating CV preview on the right. No backend needed — all data is persisted in `localStorage`. PDF export is handled entirely in-browser via `html2pdf.js`.

---

## Architecture

```
src/
├── components/
│   ├── form/           # Multi-step form sections
│   │   ├── StepNav.jsx
│   │   ├── PersonalInfo.jsx
│   │   ├── Summary.jsx
│   │   ├── WorkExperience.jsx
│   │   ├── Education.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   └── Certifications.jsx
│   ├── preview/        # CV preview & templates
│   │   ├── CVPreview.jsx
│   │   ├── templates/
│   │   │   ├── Minimalist.jsx
│   │   │   ├── Modern.jsx
│   │   │   ├── Creative.jsx
│   │   │   └── Corporate.jsx
│   └── ui/             # Reusable UI atoms
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── TextArea.jsx
│       └── TagInput.jsx
├── context/
│   └── CVContext.jsx   # Global state via React Context
├── hooks/
│   └── useLocalStorage.js
├── styles/
│   ├── index.css       # Design tokens, globals
│   └── themes/         # Per-template CSS
├── pages/
│   ├── Builder.jsx     # Main split-pane builder
│   └── Landing.jsx     # Hero / call-to-action
├── services/
│   └── pdfExport.js    # html2pdf wrapper
└── App.jsx
```

---

## Proposed Changes

### [NEW] Project Bootstrap
#### [NEW] Vite + React scaffold via `npx create-vite@latest`
- Target: `c:\Users\NEWPC\Downloads\CV maker`
- Install deps: `react-router-dom`, `html2pdf.js`, `react-hot-toast`, `framer-motion`

---

### Core State — CVContext

All CV data lives in a single context object with sections:

```js
{
  personal: { name, email, phone, address, linkedin, portfolio, photo },
  summary: "",
  experience: [ { id, title, company, location, start, end, current, bullets[] } ],
  education: [ { id, degree, institution, location, start, end, description } ],
  skills: [ { id, name, level } ],        // level: 1–5
  projects: [ { id, title, description, link } ],
  certifications: [ { id, name, issuer, date, description } ],
  meta: { template: "minimalist", darkMode: false }
}
```

Auto-saved to `localStorage` on every change via `useEffect`.

---

### Form — Multi-step Navigation

8 steps with a floating progress indicator. Each step is a standalone component with its own validation (react-hook-form or controlled inputs). Steps:

1. **Personal Info** — photo upload (FileReader → base64), text fields, URL fields  
2. **Summary** — rich textarea with character count  
3. **Work Experience** — repeating entries, drag-to-reorder  
4. **Education** — repeating entries  
5. **Skills** — tag-style input with skill-level slider  
6. **Projects** — repeating entries with URL  
7. **Certifications** — repeating entries  
8. **Review & Export** — template picker + download button  

---

### Templates (4 designs)

| Template | Style | Primary Color |
|---|---|---|
| Minimalist | Clean serif, thin lines | Slate |
| Modern | Bold headers, accent sidebar | Indigo |
| Creative | Two-column, color blocks | Teal |
| Corporate | Classic structured layout | Navy |

Each template is a pure presentational component that receives `cvData` as props.

---

### PDF Export

Uses `html2pdf.js` to capture the preview DOM node at full resolution. PDF is generated client-side — no server round-trip needed.

---

### UI/UX Highlights

- **Split pane**: form (left, scrollable) + preview (right, sticky)
- **Smooth step transitions** via `framer-motion` slide animations
- **Dark mode** toggle persisted to localStorage
- **Responsive**: collapses to single-column on mobile (tabs to switch form/preview)
- **Toast notifications** for save/export actions
- **Drag-and-drop** section reordering via native HTML5 drag API

---

## Verification Plan

### Automated
- Vite `build` completes with no errors
- `npm run dev` starts successfully

### Manual
- All 8 form sections render and validate correctly
- Switching templates updates the preview instantly
- PDF download produces a clean, properly-formatted file
- Data persists after page refresh (localStorage)
- Responsive layout works on mobile viewport
