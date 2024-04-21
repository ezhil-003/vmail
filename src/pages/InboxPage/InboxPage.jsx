import React from 'react';
import './inbox.css';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
//import { useSpeechRecognition, useSpeechSynthesis } from 'react-speech-kit';
import useLogout from '../../hooks/useLogout.jsx';
import useSpeechSynthesis from '../../hooks/customSpeechSynthesis.js';
import useSpeechRecognition from '../../hooks/useSpeechRecognition.js';
import useUnread from '../../hooks/useUnread.jsx';
import useSearch from '../../hooks/useSearch.jsx';


const InboxPage = () => {

    const { speak } = useSpeechSynthesis();
    const tkn = localStorage.getItem("accesstkn");
    const accessToken = JSON.parse(tkn);
    const { fetchUnreadMessages, fetchMessageContent, handleUnread, unreadMessages, setUnreadMessages } = useUnread(accessToken.accessToken, speak);
    const { getSearchResults } = useSearch(accessToken);
    const [listening, setListening] = useState(false);
    
    // const [listeningForCommand, setListeningForCommand] = useState(true);
    // const [listeningForKeyword, setListeningForKeyword] = useState(false);
    // const [keyword, setKeyword] = useState("");
    // const [searching, setSearching] = useState(false);

    const handleTranscript = (result) => { 
        const transcript = result.toLowerCase();
        
        switch (transcript) {
            case 'unread':
                handleUnread();
                break;
            case 'search':
                // setListeningForCommand(false);
                // setListeningForKeyword(true);
                // speak("Please say the keyword.");
                break;
            case 'back':
                handleBack();
                break;
        
            default:
                speak('you are entered wrong option')
                break;
        }
        // the error is happening on this line with this function 
        
    }

    const handleError = (error) => { 
        console.error(error);
        stopListening();
    }
    
    const { listen, stop, supported } = useSpeechRecognition({
        onResult: handleTranscript,
        onError: handleError
    });

    // Function to stop listening for voice commands
    const stopListening = () => {
        if (listening) {
            stop(); // Ensure that the stop function is being called correctly
            setListening(false);
        }
    };

    // const listenForKeyword = () => {
    //     if (!listening && supported) {
    //         setListening(true);
    //         listen();
    //     }
    // };

    // const handleSearchButtonClick = () => {
    //     setListeningForKeyword(false);
    //     setSearching(true);
    //     speak("Please say the keyword."); // Stop listening when user triggers the search action
    // };
    
    
    useEffect(() => {

        const handleKeyUp = (event) => {
            if (event.key === ' ') {
                listen();
            } else{
                stop();
            }
        };
        window.addEventListener('keydown', handleKeyUp);

        // Cleanup function
        return () => {
            window.removeEventListener('keydown', handleKeyUp);
        };
    }, [listen,stop]);

    

    // useEffect(() => {
    //     if (listeningForCommand) {
    //         listen();
    //     }
    // }, [listeningForCommand, listen]);

    // useEffect(() => {
    //     if (listeningForKeyword) {
    //         listen();
    //     }
    // }, [listeningForKeyword, listen]);


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
        <div className="containerIn" >
            <div className='wrapperIn'>
                <h1>Inbox Page</h1>
                <p>What would you like to do?</p>
                <br />
                <button onClick={handleUnread}>Unread</button>
                <br /><br />
                {/* <button  onClick={listenForKeyword}>Search</button> */}
                <br /><br />
                <button onClick={handleBack} >Back</button>
                <br /><br />
                <button onClick={handleLogout}>LogOut</button>
                <br /><br />
            </div>
        </div>
    );
}

export default InboxPage;

