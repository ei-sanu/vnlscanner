import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Shield, ChevronDown, Info } from 'lucide-react';
import { generateResponse, createNewChat, addMessage } from '../../lib/chatbot';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState(createNewChat());
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const updatedMessages = addMessage(messages, 'user', inputValue);
    setMessages(updatedMessages);
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate bot response after a short delay
    setTimeout(() => {
      const response = generateResponse(inputValue.toLowerCase());
      setMessages(prevMessages => addMessage(prevMessages, 'bot', response.message));
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  const resetChat = () => {
    setMessages(createNewChat());
  };
  
  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        aria-label="Open cybersecurity chat assistant"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 w-[350px] sm:w-[380px] h-[500px] bg-dark-200 rounded-lg shadow-xl overflow-hidden z-40 flex flex-col border border-primary-900/40"
          >
            {/* Chat Header */}
            <div className="p-4 bg-dark-100 border-b border-dark-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary-300" />
                <h3 className="font-semibold text-white">Security Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChat}
                  className="p-1.5 text-gray-400 hover:text-primary-300 transition-colors rounded-md"
                  aria-label="Reset chat"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 text-gray-400 hover:text-primary-300 transition-colors rounded-md"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-dark-300">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary-700 text-white rounded-tr-none'
                          : 'bg-dark-100 text-gray-200 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-primary-300' : 'text-gray-400'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Bot typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[80%] p-3 rounded-lg bg-dark-100 text-gray-200 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Invisible element to scroll to */}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Educational Note */}
            <div className="p-2 bg-dark-100 border-t border-dark-200">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Info className="h-3 w-3" />
                <span>Ask about ethical hacking, web security, or network protection</span>
              </div>
            </div>
            
            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-dark-100 border-t border-dark-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your cybersecurity question..."
                  className="flex-1 bg-dark-200 border border-dark-100 rounded-l-md py-2 px-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-r-md transition-colors"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;