import React, { useState, useRef } from 'react';
import { Send, Mic, Camera, Paperclip, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInput({ onSend, onVoice, onCamera, isLoading, imagePreview, onClearImage }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim() || imagePreview) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (onVoice) onVoice(!isRecording);
  };

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-3 safe-area-bottom">
      <div className="max-w-lg mx-auto">
        <AnimatePresence>
          {imagePreview && (
 