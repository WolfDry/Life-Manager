import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthenticatedRouter from './router/AuthenticatedRouter'

import './styles/App.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <AuthenticatedRouter />
  </React.StrictMode>
)
