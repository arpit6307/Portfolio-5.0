import React, { useState, useRef, useEffect } from 'react';
import { Bio, skills, projects, experiences, education } from '../../data/constants';
import {
  ChatFab,
  ChatWindow,
  ChatHeader,
  HeaderTitle,
  CloseButton,
  MessageList,
  UserMessage,
  BotMessage,
  InputArea,
  ChatInput,
  SendButton,
  TypingIndicator
} from './ChatbotStyle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hello! I'm Arpit's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const portfolioData = {
      bio: Bio,
      skills: skills,
      projects: projects,
      experience: experiences,
      education: education
    };

    const systemPrompt = `You are Arpit Singh Yadav's friendly and professional AI assistant for his portfolio website. Your goal is to answer questions based ONLY on the provided data. Do not make up information. Be concise and helpful. Here is the data about Arpit: ${JSON.stringify(portfolioData)}`;

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    const payload = {
        contents: [{ parts: [{ text: input }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
    };

    try {
        if (!apiKey) {
            throw new Error("API Key is missing. Please create a .env file, add REACT_APP_GEMINI_API_KEY, and restart the server.");
        }

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.error?.message || "An unknown API error occurred.");
        }

        const botResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that. Please try asking differently.";
        setMessages((prev) => [...prev, { from: 'bot', text: botResponse }]);
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // Ab error message chatbot mein hi dikhega
        setMessages((prev) => [...prev, { from: 'bot', text: `Sorry, an error occurred: ${error.message}` }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      <ChatFab onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon style={{ color: 'white' }} /> : <SmartToyIcon style={{ color: 'white' }} />}
      </ChatFab>
      {isOpen && (
        <ChatWindow isOpen={isOpen}>
          <ChatHeader>
            <HeaderTitle>AI Assistant</HeaderTitle>
            <CloseButton onClick={() => setIsOpen(false)}><CloseIcon /></CloseButton>
          </ChatHeader>
          <MessageList ref={messageListRef}>
            {messages.map((msg, index) =>
              msg.from === 'user' ? (
                <UserMessage key={index}>{msg.text}</UserMessage>
              ) : (
                <BotMessage key={index}>{msg.text}</BotMessage>
              )
            )}
            {isLoading && (
              <TypingIndicator>
                <div></div>
                <div></div>
                <div></div>
              </TypingIndicator>
            )}
          </MessageList>
          <InputArea onSubmit={handleSendMessage}>
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about my skills..."
            />
            <SendButton type="submit" disabled={!input.trim() || isLoading}>
              <SendIcon />
            </SendButton>
          </InputArea>
        </ChatWindow>
      )}
    </>
  );
};

export default Chatbot;

