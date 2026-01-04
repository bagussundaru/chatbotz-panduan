import React from 'react';
import AppHeader from '@/components/ui/AppHeader';
import StatsCard from '@/components/home/StatsCard';
import QuickAction from '@/components/home/QuickAction';
import { MessageSquare, Camera, FileText, BookOpen, Zap, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const stats = [
    { icon: MessageSquare, label: 'Konsultasi Hari Ini', value: '24', trend: 12, color: 'cyan' },
    { icon: CheckCircle, label: 'BA Selesai', value: '8', trend: 25, color: 'green' },
    { icon: Clock, label: 'Rata-rata Respons', value: '2.3s', color: 'amber' },
    { icon: AlertTriangle, label: 'Temuan Aktif', value: '5', color: 'violet' },
  ];

  const quickActions = [
    { icon: MessageSquare, label: 'Chatbot Cerdas', description: 'Konsultasi teknis & regulasi real-time', page: 'Chatbot', color: 'cyan' },
    { icon: Camera, label: 'Scanner Meter', description: 'OCR meter & analisis otomatis', page: 'Scanner', color: 'violet' },
    { icon: FileText, label: 'Buat Berita Acara', description: 'Pembuatan BA otomatis sesuai DIR', page: 'Reports', color: 'amber' },
    { icon: BookOpen, label: 'Basis Pengetahuan', description: 'SOP, Manual & Tutorial Video', page: 'Documents', color: 'emerald' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AppHeader 
        title="Selamat Datang" 
        subtitle="Asisten Digital P2TL siap membantu Anda"
      />

      <div className="px-4 sm:px-6 -mt-2 max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <QuickAction key={action.page} {...action} delay={index * 0.1} />
              ))}
            </div>
          </div>

          {/* Performance Banner */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Performa</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#0F2B46] to-[#1A3A5C] rounded-2xl p-5 text-white h-full"
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-lg">Minggu Ini</h3>
                  <p className="text-cyan-300 text-sm mt-1">MTTR berkurang 40%</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-xs text-gray-300 mt-1">Kasus Selesai</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-xs text-gray-300 mt-1">Akurasi AI</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional space for desktop */}
        <div className="mb-6 lg:mb-12" />
      </div>
    </div>
  );
}