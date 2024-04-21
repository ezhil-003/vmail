import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleAuthContextProvider } from './context/GoogleAuthContext.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <GoogleAuthContextProvider>
            <GoogleOAuthProvider clientId="186201352457-g47v0mr90hbcap0a3lrgsd0o5oupvb17.apps.googleusercontent.com">
                <App />
            </GoogleOAuthProvider>
        </GoogleAuthContextProvider>
    </StrictMode>
)
