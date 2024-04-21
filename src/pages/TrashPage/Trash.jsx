import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useSpeechRecognition } from 'react-speech-kit';
import './Trash.css';
import useTrashMessages from '../../hooks/useTrashMessages';
import useSpeechRecognition from '../../hooks/useSpeechRecognition.js';
import useLogout from '../../hooks/useLogout';

const Trash = () => {

    const tkn = localStorage.getItem("accesstkn");
    const accessToken = JSON.parse(tkn);
    const { trashMessages } = useTrashMessages(accessToken.accessToken);
    const { listen, stop } = useSpeechRecognition();

    
    const handleTranscript = (result) => { 
        const transcript = result.toLowerCase();
        
        switch (transcript) {
            case 'trash':
                trashMessages();
                break;
            case 'back':
                handleBack();
                break;
            case 'logout':
                handleLogout();
                break;
        
            default:
                speak('you are entered wrong option')
                break;
        }
        // the error is happening on this line with this function 
        
    }
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

    console.log(trashMessages);

  return (
    <div className="containert" id="container">
        <div className="form-containert">
            <h1>Trash</h1>
            <p>What would you like to do?</p>  
            <br /><br />
            <button className="option_btnt" type="button" onClick={trashMessages} >Trash</button>
            <br /><br />
            <button className="option_btnt" type="button"  onClick={handleBack}>BACK</button>
            <br /><br />
            <button className="option_btnt" type="button"  onClick={handleLogout}>LOGOUT</button>
            <br /><br />
        </div>
    </div>
  )
}

export default Trash;