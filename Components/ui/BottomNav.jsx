import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, MessageSquare, Camera, FileText, BookOpen } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Beranda', page: 'Home' },
    { icon: MessageSquare, label: 'Chatbot', page: 'Chatbot' },
    { icon: Camera, label: 'Scanner', page: 'Scanner' },
    { icon: FileText, label: 'Laporan', page: 'Reports' },
    { icon: BookOpen, label: 'Dokumen', page: 'Documents' },
  ];

  const isActive = (pageName) => {
    const pageUrl = createPageUrl(pageName);
    return location.pathname === pageUrl || location.pathname === pageUrl.replace(/\/$/, '');
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 px-2 py-1 z-50 safe-area-bottom lg:hidden">
      <div className="max-w-lg mx-auto flex justify-around items-center">
        {navItems.map(({ icon: Icon, label, page }) => (
          <Link
            key={page}
            to={createPageUrl(page)}
            className={`flex flex-col items-center py-2 px-3 rounded-xl transition-all duration-300 ${isActive(page)
                ? 'text-cyan-600 bg-cyan-50'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <Icon className={`w-6 h-6 mb-1 ${isActive(page) ? 'text-cyan-600' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}