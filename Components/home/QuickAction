import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function QuickAction({ icon: Icon, label, description, page, color, delay = 0 }) {
  const colorClasses = {
    cyan: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    violet: 'bg-gradient-to-br from-violet-500 to-violet-600',
    amber: 'bg-gradient-to-br from-amber-500 to-amber-600',
    emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Link
        to={createPageUrl(page)}
        className="flex items-center gap-3 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 hover:shadow-lg hover:border-cyan-200 transition-all duration-300 group"
      >
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${colorClasses[color]} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{label}</h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" />
      </Link>
 