import React from "react";
import "./Sentmail.css";
import { useSpeechRecognition,useSpeechSynthesis } from "react-speech-kit";
import { useEffect } from "react";
import useLogout from '../../hooks/useLogout.jsx';
import { useNavigate } from "react-router-dom";
 

const SentMailsPage = () => {
    
    // For handle logout button
    const logout = useLogout();
    const handleLogout = () => {
        // Call the logout function from the custom hook
        logout();
        
    };

    //To navigate back options page
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/options")
    }

    return (
        <div className="containersent" id="container">
           <div className="sentform">
                <h1>Sent Mails Page</h1>
                <p>what would you like to do ? </p>
                <br/>
                <br/>
                <button >SENT</button>
                <br/><br/>
                <button onClick={handleBack}>BACK</button>
                <br/><br/>
                <button onClick={handleLogout}>LOGOUT</button>
                <br/><br/>
            </div>
        </div>
    );
};
export default SentMailsPage;
