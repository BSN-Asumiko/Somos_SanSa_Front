import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthProvider } from "./auth/AuthWrapper.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>,
)
