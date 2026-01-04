import React from 'react';
import { Bell, User } from 'lucide-react';

export default function AppHeader({ title, subtitle }) {
  return (
    <header className="bg-gradient-to-r from-[#0F2B46] to-[#1A3A5C] text-white px-4 sm:px-6 pt-12 pb-6 safe-area-top">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6959e4a97eb9cc36b84ef511/91e96e17e_PLN-Icon-Plus1.png" 
              alt="PLN Icon Plus"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">{title || 'AP2T Assistant'}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center hover:bg-cyan-400 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-300">{subtitle}</p>
        )}
      </div>
    </header>
  );
}