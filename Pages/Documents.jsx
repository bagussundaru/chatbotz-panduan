import React, { useState } from 'react';
import AppHeader from '@/components/ui/AppHeader';
import { Search, BookOpen, FileText, Play, Download, Eye, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const mockDocuments = [
  {
    id: 1,
    title: 'SOP Penanganan Pencurian Listrik',
    category: 'SOP',
    content_preview: 'Prosedur standar untuk penanganan kasus pencurian listrik termasuk dokumentasi, pengukuran, dan pembuatan berita acara.',
    views: 1247,
    tags: ['P2TL', 'Pencurian', 'BA']
  },
  {
    id: 2,
    title: 'Manual Meter Digital Hexing HXE310',
    category: 'Manual',
    content_preview: 'Panduan lengkap pengoperasian dan troubleshooting meter digital Hexing seri HXE310 termasuk kode error.',
    views: 892,
    tags: ['Meter', 'Hexing', 'Troubleshooting']
  },
  {
    id: 3,
    title: 'DIR PLN 2024 - Penertiban Pemakaian Tenaga Listrik',
    category: 'Regulasi',
    content_preview: 'Direksi PLN tahun 2024 tentang tata cara penertiban pemakaian tenaga listrik dan sanksi pelanggaran.',
    views: 2156,
    tags: ['DIR', 'Regulasi', 'Sanksi']
  },
  {
    id: 4,
    title: 'Video: Cara Identifikasi Meter Bypass',
    category: 'Tutorial',
    content_preview: 'Tutorial video langkah demi langkah untuk mengidentifikasi berbagai modus bypass meter listrik.',
    views: 3421,
    tags: ['Video', 'Bypass', 'Identifikasi'],
    isVideo: true
  },
  {
    id: 5,
    title: 'Edaran Keselamatan Kerja P2TL',
    category: 'Edaran',
    content_preview: 'Pedoman keselamatan kerja untuk petugas P2TL termasuk APD wajib dan prosedur darurat.',
    views: 756,
    tags: ['K3', 'Keselamatan', 'APD']
  },
  {
    id: 6,
    title: 'Manual Meter Itron ACE6000',
    category: 'Manual',
    content_preview: 'Dokumentasi teknis meter prepaid Itron ACE6000 termasuk konfigurasi dan perawatan.',
    views: 645,
    tags: ['Meter', 'Itron', 'Prepaid']
  }
];

const categoryConfig = {
  SOP: { color: 'bg-cyan-100 text-cyan-700', icon: FileText },
  Manual: { color: 'bg-violet-100 text-violet-700', icon: BookOpen },
  Regulasi: { color: 'bg-amber-100 text-amber-700', icon: FileText },
  Tutorial: { color: 'bg-emerald-100 text-emerald-700', icon: Play },
  Edaran: { color: 'bg-rose-100 text-rose-700', icon: FileText },
};

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Object.keys(categoryConfig)];

  const filteredDocs = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Basis Pengetahuan" subtitle="SOP, Manual & Tutorial" />

      <div className="px-4 -mt-2 max-w-lg mx-auto">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari dokumen atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>

        {/* Popular Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Paling Populer</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mockDocuments
              .sort((a, b) => b.views - a.views)
              .slice(0, 3)
              .map(doc => {
                const catConfig = categoryConfig[doc.category];
                return (
                  <motion.div
                    key={doc.id}
                    whileTap={{ scale: 0.98 }}
                    className="flex-shrink-0 w-64 bg-gradient-to-br from-[#0F2B46] to-[#1A3A5C] rounded-2xl p-4 text-white"
                  >
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${catConfig.color}`}>
                      {doc.category}
                    </span>
                    <h3 className="font-semibold mt-2 line-clamp-2">{doc.title}</h3>
                    <div className="flex items-center gap-1 mt-3 text-gray-400 text-xs">
                      <Eye className="w-3 h-3" />
                      {doc.views.toLocaleString()} views
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocs.map((doc, index) => {
            const catConfig = categoryConfig[doc.category];
            const Icon = catConfig.icon;
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl ${catConfig.color} flex items-center justify-center flex-shrink-0`}>
                    {doc.isVideo ? <Play className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${catConfig.color} mb-1`}>
                      {doc.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 line-clamp-1">{doc.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{doc.content_preview}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-1">
                        {doc.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Eye className="w-3 h-3" />
                        {doc.views.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada dokumen ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}