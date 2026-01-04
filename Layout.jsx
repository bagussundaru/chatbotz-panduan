import React from 'react';
import BottomNav from '@/components/ui/BottomNav';

export default function Layout({ children, currentPageName }) {
  const hideNavPages = ['Scanner'];
  const showNav = !hideNavPages.includes(currentPageName);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        :root {
          --safe-area-inset-top: env(safe-area-inset-top, 0px);
          --safe-area-inset-bottom: env(safe-area-inset-bottom, 0px);
        }
        .safe-area-top {
          padding-top: max(env(safe-area-inset-top), 12px);
        }
        .safe-area-bottom {
          padding-bottom: max(env(safe-area-inset-bottom), 8px);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease-out forwards;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2s ease-in-out infinite;
        }
        @media (min-width: 1024px) {
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
      <main className={showNav ? 'pb-24 lg:pb-0' : ''}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}