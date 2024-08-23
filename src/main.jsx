import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./components/sass/universal.scss";


createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <GoogleOAuthProvider clientId='775942239559-r29eq6nbses5rqc4relot63phaaooep2.apps.googleusercontent.com'> */}
    <App />
  {/* </GoogleOAuthProvider> */}
  </StrictMode>,
)
