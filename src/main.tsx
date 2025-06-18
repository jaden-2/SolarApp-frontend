import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/normalize.css'
import './styles/index.css'
import App from './App'
import { AuthProvider } from './AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthProvider>
     <App/>
   </AuthProvider>
  </StrictMode>,
)
