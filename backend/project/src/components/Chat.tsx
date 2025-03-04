import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatProps {
  username: string;
}

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hello ${username}! I'm your AI assistant. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setIsTyping(false);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  // Simple response generation based on user input
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return `Hello again! How can I assist you today?`;
    }
    
    if (input.includes('name')) {
      return `I'm an AI assistant designed to help with various tasks. You can call me Assistant.`;
    }
    
    if (input.includes('weather')) {
      return `I'm sorry, I don't have access to real-time weather data. In a real implementation, I would connect to a weather API to provide this information.`;
    }
    
    if (input.includes('help')) {
      return `I can help with answering questions, providing information, or simulating various AI capabilities. Just let me know what you need!`;
    }
    
    if (input.includes('security') || input.includes('penetration testing')) {
      return `Security is a critical concern in AI systems. In a real implementation, proper security measures would include encryption, authentication, authorization, and regular security audits. Penetration testing should be performed by qualified security professionals following ethical guidelines.`;
    }
    
    if (input.includes('self-improve') || input.includes('learning')) {
      return `AI systems can improve through techniques like reinforcement learning, transfer learning, and continuous training on new data. However, true self-improvement requires careful design and oversight to ensure safety and alignment with human values.`;
    }
    
    if (input.includes('banking') || input.includes('transaction')) {
      return `Voice-based banking would require strict security protocols, multi-factor authentication, and compliance with financial regulations. In a production system, all transactions would be encrypted and verified through secure channels.`;
    }
    
    if (input.includes('deploy') || input.includes('cloud')) {
      return `Deployment to cloud platforms would involve containerization (e.g., Docker), orchestration (e.g., Kubernetes), and implementing proper security measures. Major cloud providers like AWS, Azure, and GCP offer AI-specific services that can be leveraged.`;
    }
    
    // Default response
    return `That's an interesting point. In a fully implemented system, I would have more capabilities to address this. Is there something specific you'd like to know about AI systems?`;
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">AI Assistant Chat</h2>
        <p className="text-sm text-gray-500">Ask questions or request information</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'ai' ? (
                  <Bot className="h-4 w-4 mr-1" />
                ) : (
                  <User className="h-4 w-4 mr-1" />
                )}
                <span className="text-xs font-medium">
                  {message.sender === 'user' ? username : 'AI Assistant'}
                </span>
                <span className="text-xs ml-2 opacity-70">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start message-animation">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;