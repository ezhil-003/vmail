import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import LoginPage from "./pages/loginpage/LoginPage.jsx"
import OptionsPage from "./pages/OptionsPage/OptionsPage.jsx";
import InboxPage from "./pages/InboxPage/InboxPage.jsx";
import SentmailPage from "./pages/SentmailPage/SentmailPage.jsx";
import Trash from "./pages/TrashPage/Trash.jsx";
import ComposePage from "./pages/ComposePage/ComposePage.jsx";
import { useEffect, useState } from 'react';
import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';



function App() {
  useEffect(() => {
    // Check token validity when the component mounts
    if (!isTokenValid()) {
      // If token is not valid, navigate to login page
      //return <Navigate to="/" />;
      // or use history.push('/') if you have access to history
      <Navigate to="/" />
    }
  }, []);
  const isTokenValid = () => {
    // Get token info from local storage
    const tokenInfoString = localStorage.getItem("accesstkn");
    if (!tokenInfoString) {
      return false; // No token found, user needs to login
    }

    const tokenInfo = JSON.parse(tokenInfoString);
    const currentTime = new Date().getTime();
    const tokenTime = tokenInfo.timestamp;
    const tokenExpirationTime = tokenTime + (60 * 60 * 1000); // One hour in milliseconds
    if (currentTime >= tokenExpirationTime) {
      // Token is expired, remove it from local storage
      localStorage.removeItem("accesstkn");
      localStorage.removeItem("authcode");
      return false; // Token is not valid
    }


    return true;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* Protected route: Options page */}
        <Route path="/options" element={isTokenValid() ? <OptionsPage /> : <Navigate to="/" />} />
        <Route path="/compose" element={isTokenValid() ? <ComposePage /> : <Navigate to="/" />} />
        <Route path="/inbox" element={isTokenValid() ? <InboxPage /> : <Navigate to="/" />} />
        <Route path="/sent" element={isTokenValid() ? <SentmailPage /> : <Navigate to="/" />} />
        <Route path="/trash" element={isTokenValid() ? <Trash /> : <Navigate to="/" />} />
        {/* Route for the root path */}

      </Routes>
    </Router>
  )
}

export default App
