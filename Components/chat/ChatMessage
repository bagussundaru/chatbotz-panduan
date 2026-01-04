import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, FileText, Clock } from 'lucide-react';

export default function ChatMessage({ message, isBot, sources, responseTime, isTyping }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isBot ? '' : 'flex-row-reverse'}`}
    >
      <div className={`w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center ${
        isBot ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' : 'bg-gradient-to-br from-violet-500 to-violet-600'
      }`}>
        {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
      </div>
      
      <div className={`flex-1 max-w-[80%] ${isBot ? '' : 'flex flex-col items-end'}`}>
        <div className={`rounded-2xl px-4 py-3 ${
          isBot 
            ? 'bg-white shadow-sm border border-gray-100 rounded-tl-md' 
            : 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white rounded-tr-md'
        }`}>
          {isTyping ? (
            <div className="flex gap-1.5 py-1">
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          ) : (
            <p className={`text-sm leading-relaxed ${isBot ? 'text-gray-700' : 'text-white'}`}>
              {message}
            </p>
 