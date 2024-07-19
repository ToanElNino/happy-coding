import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const appendMessage = (sender, text) => {
        setMessages(prevMessages => [...prevMessages, { sender, text }]);
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { role: 'user', content: input };
        appendMessage('User', input);

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        ...messages.map(msg => ({ role: msg.sender.toLowerCase(), content: msg.text })),
                        userMessage,
                    ],
                    max_tokens: 150,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer `,
                    },
                }
            );

            const gptResponse = response.data.choices[0].message.content.trim();
            appendMessage('ChatGPT', gptResponse);
        } catch (error) {
            console.error('Error fetching response from ChatGPT:', error);
        }

        setInput('');
    };

    return (
        <div>
            <h1>Chat with GPT-4</h1>
            <div id="chat" style={{ border: '1px solid #ccc', padding: '10px', width: '300px', height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                style={{ width: '300px' }}
            />
            <button onClick={handleSend} style={{ marginTop: '10px' }}>Send</button>
        </div>
    );
};

export default ChatGPT;
