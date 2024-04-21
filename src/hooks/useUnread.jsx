import { useState } from 'react';
    
const useUnread = (accessToken, speak) => {
    
    const [unreadMessages, setUnreadMessages] = useState([]);

    const fetchUnreadMessages = async () => {
        try {
            const queryParams = new URLSearchParams({
                q: "is:unread category:primary", // Filter for unread messages
                maxResults: 5, // Limit the results to 5 messages
            });
            const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?${queryParams}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch inbox contents");
            }
            const data = await response.json();
            return data.messages;
        } catch (error) {
            console.error("Error fetching unread messages:", error);
            return [];
        }
    };

    const fetchMessageContent = async (messageId) => {
        try {
            const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch message content");
            }
            const messageData = await response.json();
            // Process message data as needed
            return messageData;
        } catch (error) {
            console.error("Error fetching message content:", error);
            return null;
        }
    };

    const speakMessageContent = async (message) => {
        // Fetch message content
        const messageData = await fetchMessageContent(message.id);
        if (!messageData) return;
        // Process message content
        // Example: Speak the subject and body
        const fromHeader = messageData.payload.headers.find(header => header.name === "From");
        const subject = messageData.payload.headers.find(header => header.name === "Subject")?.value;
        const body = messageData.snippet; // Use snippet for simplicity
        if (fromHeader && subject && body) {
            const sender = fromHeader.value;
            const messageToSpeak = `from ${sender} ${body}. Message: ${subject}`;
            speak(messageToSpeak);
        }
    };

    const handleUnread = async () => {
        const messages = await fetchUnreadMessages();
        setUnreadMessages(messages);
        for (const message of messages) {
            await speakMessageContent(message);
        }
    };

    return {
        fetchUnreadMessages,
        fetchMessageContent,
        handleUnread,
        unreadMessages,
        setUnreadMessages,
    };
};

export default useUnread;
