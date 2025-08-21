import './index.css'   // <-- This is the correct import
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( //Because the root element cannot exist, you are telling it is sure it exists
  <StrictMode> 
    <App />
  </StrictMode>,
)
