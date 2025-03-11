document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Generate a unique session ID for this conversation
    const sessionId = 'session-' + Date.now();
    
    // Function to add a message to the chat interface
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message bot-message';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = message;
        
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'message bot-message typing-indicator';
        indicatorDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            indicatorDiv.appendChild(dot);
        }
        
        chatMessages.appendChild(indicatorDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            chatMessages.removeChild(indicator);
        }
    }
    
    // Function to send a message to the backend
    async function sendMessage(message) {
        try {
            showTypingIndicator();
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    session_id: sessionId
                })
            });
            
            const data = await response.json();
            removeTypingIndicator();
            
            if (data.success) {
                addMessage(data.response);
            } else {
                addMessage('Sorry, I encountered an error. Please try again.');
                console.error('Error:', data.error);
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage('Sorry, I encountered an error. Please try again.');
            console.error('Error:', error);
        }
    }
    
    // Function to reset the conversation
    async function resetConversation() {
        try {
            const response = await fetch('/api/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    session_id: sessionId
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Clear the chat interface
                chatMessages.innerHTML = '';
                addMessage('Hello! I\'m your intelligent assistant. How can I help you today?');
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    // Event listener for send button
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            sendMessage(message);
        }
    });
    
    // Event listener for Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = userInput.value.trim();
            
            if (message) {
                addMessage(message, true);
                userInput.value = '';
                sendMessage(message);
            }
        }
    });
    
    // Event listener for reset button
    resetBtn.addEventListener('click', resetConversation);
});