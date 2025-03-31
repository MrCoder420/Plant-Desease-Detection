import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  margin-top: 40px;
  flex-direction: column;
  height: calc(100vh - 100px);
  background: linear-gradient(180deg, #343541 0%, #202123 100%);
  color: #fff;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

const ChatHeader = styled.div`
  margin-top: 70px;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(86, 88, 105, 0.5);
  background: linear-gradient(90deg, rgba(52, 53, 65, 0.95), rgba(32, 33, 35, 0.95));
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ChatTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  background: linear-gradient(45deg, #10A37F, #19C37D);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

const Message = styled.div`
  display: flex;
  padding: 20px;
  background: ${props => props.isUser ? 'rgba(52, 53, 65, 0.8)' : 'rgba(68, 70, 84, 0.8)'};
  border-radius: 12px;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: messageSlideIn 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @keyframes messageSlideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${props => props.isUser ? 'linear-gradient(135deg, #19C37D, #10A37F)' : 'linear-gradient(135deg, #10A37F, #0D8A6C)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const MessageContent = styled.div`
  flex: 1;
  line-height: 1.6;
  white-space: pre-wrap;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
  padding: 20px;
  background: linear-gradient(180deg, rgba(52, 53, 65, 0.95), rgba(32, 33, 35, 0.95));
  border-top: 1px solid rgba(86, 88, 105, 0.5);
  position: sticky;
  bottom: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 16px 50px 16px 20px;
  border-radius: 12px;
  border: 2px solid rgba(86, 88, 105, 0.5);
  background: rgba(64, 65, 79, 0.8);
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  min-height: 56px;
  max-height: 200px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #10A37F;
    box-shadow: 0 2px 12px rgba(16, 163, 127, 0.2);
    background: rgba(64, 65, 79, 0.95);
  }

  &::placeholder {
    color: rgba(142, 142, 160, 0.8);
  }
`;

const SendButton = styled.button`
  position: absolute;
  right: 12px;
  bottom: 12px;
  background: linear-gradient(135deg, #10A37F, #19C37D);
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 163, 127, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  span {
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, #10A37F, #19C37D);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out;
    box-shadow: 0 2px 8px rgba(16, 163, 127, 0.3);
    
    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: "qwen/qwen2.5-vl-3b-instruct:free",
        messages: [
          ...messages.map(msg => ({
            role: msg.isUser ? "user" : "assistant",
            content: msg.text
          })),
          {
            role: "user",
            content: userMessage
          }
        ]
      }, {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
        }
      });

      const botResponse = response.data.choices[0].message.content;
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting to the server. Please try again later.", 
        isUser: false 
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>Krushi GPT</ChatTitle>
      </ChatHeader>
      
      <ChatMessages>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            <Avatar isUser={message.isUser}>
              {message.isUser ? 'U' : 'A'}
            </Avatar>
            <MessageContent>{message.text}</MessageContent>
          </Message>
        ))}
        {isLoading && (
          <Message isUser={false}>
            <Avatar isUser={false}>A</Avatar>
            <LoadingDots>
              <span></span>
              <span></span>
              <span></span>
            </LoadingDots>
          </Message>
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <InputContainer>
        <InputWrapper>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Send a message..."
            disabled={isLoading}
          />
          <SendButton onClick={handleSend} disabled={isLoading || !input.trim()}>
            ➤
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatBot; 