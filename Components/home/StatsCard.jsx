import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function StatsCard({ icon: Icon, label, value, trend, color }) {
  const colorClasses = {
    cyan: 'bg-cyan-500/20 text-cyan-200',
    green: 'bg-green-500/20 text-green-200',
    amber: 'bg-amber-500/20 text-amber-200',
    violet: 'bg-violet-500/20 text-violet-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[color] || 'bg-white/10'}`}>
          <Icon className="w-5 h-5 text-current" />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-0.5">{value}</h3>
        <p className="text-xs text-gray-400 font-medium">{label}</p>
      </div>
    </motion.div>
  );
}