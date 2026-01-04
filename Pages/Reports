import React, { useState } from 'react';
import AppHeader from '@/components/ui/AppHeader';
import { Plus, FileText, Clock, CheckCircle, XCircle, ChevronRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

const mockReports = [
  {
    id: 1,
    report_number: 'BA/P2TL/JTM/2024/00127',
    customer_id: 'IDpel-52847291',
    customer_name: 'PT. Maju Sejahtera',
    location: 'Jl. Industri Raya No. 45, Surabaya',
    violation_type: 'pencurian_listrik',
    status: 'approved',
    created_date: '2024-01-15T10:30:00',
    description: 'Ditemukan bypass meter dengan kabel tambahan'
  },
  {
    id: 2,
    report_number: 'BA/P2TL/JTM/2024/00128',
    customer_id: 'IDpel-52847388',
    customer_name: 'Toko Elektronik Jaya',
    location: 'Jl. Pasar Baru No. 12, Surabaya',
    violation_type: 'meter_rusak',
    status: 'submitted',
    created_date: '2024-01-15T14:20:00',
    description: 'Meter menunjukkan error E04, perlu penggantian'
  },
  {
    id: 3,
    report_number: 'BA/P2TL/JTM/2024/00129',
    customer_id: 'IDpel-52847455',
    customer_name: 'Rumah Makan Padang Sederhana',
    location: 'Jl. Raya Darmo No. 78, Surabaya',
    violation_type: 'koneksi_ilegal',
    status: 'draft',
    created_date: '2024-01-15T16:45:00',
    description: 'Sambungan ilegal dari tiang listrik ke dapur'
  },
  {
    id: 4,
    report_number: 'BA/P2TL/JTM/2024/00130',
    customer_id: 'IDpel-52847512',
    customer_name: 'Bengkel Motor ABC',
    location: 'Jl. Kenjeran No. 156, Surabaya',
    violation_type: 'pelanggaran_kontrak',
    status: 'rejected',
    created_date: '2024-01-14T09:15:00',
    description: 'Penggunaan daya melebihi kontrak tanpa pemberitahuan'
  }
];

const statusConfig = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700', icon: FileText },
  submitted: { label: 'Diajukan', color: 'bg-amber-100 text-amber-700', icon: Clock },
  approved: { label: 'Disetujui', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700', icon: XCircle },
};

const violationLabels = {
  pencurian_listrik: 'Pencurian Listrik',
  pelanggaran_kontrak: 'Pelanggaran Kontrak',
  meter_rusak: 'Meter Rusak',
  koneksi_ilegal: 'Koneksi Ilegal',
  lainnya: 'Lainnya'
};

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = 
      report.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.report_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || report.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader title="Berita Acara" subtitle="Kelola laporan P2TL" />

      <div className="px-4 -mt-2 max-w-lg mx-auto">
        {/* Search & Filter */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari laporan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
          >
            <option value="all">Semua</option>
            <option value="draft">Draft</option>
            <option value="submitted">Diajukan</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {Object.entries(statusConfig).map(([key, config]) => {
            const count = mockReports.filter(r => r.status === key).length;
            const Icon = config.icon;
            return (
              <button
                key={key}
                onClick={() => setFilterStatus(filterStatus === key ? 'all' : key)}
                className={`p-3 rounded-xl text-center transition-all ${
                  filterStatus === key ? 'bg-cyan-500 text-white' : 'bg-white border border-gray-100'
                }`}
              >
                <p className="text-xl font-bold">{count}</p>
                <p className="text-xs mt-0.5 truncate">{config.label}</p>
              </button>
            );
          })}
        </div>

        {/* Create New Button */}
        <Link
          to={createPageUrl('CreateReport')}
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-2xl font-medium mb-6 hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          <Plus className="w-5 h-5" />
          Buat Berita Acara Baru
        </Link>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report, index) => {
            const status = statusConfig[report.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 font-mono">{report.report_number}</p>
                    <h3 className="font-semibold text-gray-900 mt-1">{report.customer_name}</h3>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
                
                <p className="text-sm text-gray-500 mb-2 line-clamp-1">{report.location}</p>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-violet-100 text-violet-700 rounded text-xs">
                      {violationLabels[report.violation_type]}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(report.created_date)}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada laporan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}