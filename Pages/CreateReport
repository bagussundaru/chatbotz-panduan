import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, MapPin, User, FileText, Plus, X, Send, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';

const violationTypes = [
  { value: 'pencurian_listrik', label: 'Pencurian Listrik', pasal: 'Pasal 362 KUHP' },
  { value: 'pelanggaran_kontrak', label: 'Pelanggaran Kontrak', pasal: 'DIR PLN 2024 Pasal 12' },
  { value: 'meter_rusak', label: 'Meter Rusak/Dirusak', pasal: 'DIR PLN 2024 Pasal 8' },
  { value: 'koneksi_ilegal', label: 'Koneksi Ilegal', pasal: 'UU No. 30/2009 Pasal 19' },
  { value: 'lainnya', label: 'Lainnya', pasal: '-' },
];

export default function CreateReport() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customer_id: '',
    customer_name: '',
    location: '',
    violation_type: '',
    description: '',
    photos: [],
    findings: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoCapture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFormData(prev => ({
            ...prev,
            photos: [...prev.photos, e.target.result]
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const generateAIDescription = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const selectedViolation = violationTypes.find(v => v.value === formData.violation_type);
      const generatedText = `Pada hari ini telah dilakukan pemeriksaan di lokasi ${formData.location || '[lokasi]'} terhadap pelanggan dengan ID ${formData.customer_id || '[ID Pelanggan]'} atas nama ${formData.customer_name || '[Nama Pelanggan]'}.\n\nDitemukan indikasi ${selectedViolation?.label || '[jenis pelanggaran]'}. Berdasarkan pemeriksaan visual dan pengukuran teknis, petugas menemukan adanya anomali pada instalasi meter listrik.\n\nTemuan ini merupakan pelanggaran berdasarkan ${selectedViolation?.pasal || '[pasal]'}. Dokumentasi foto terlampir sebagai bukti.`;
      
      setFormData(prev => ({
        ...prev,
        description: generatedText,
        findings: selectedViolation?.pasal || ''
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleSubmit = () => {
    // In real app, save to database
    navigate(createPageUrl('Reports'));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0F2B46] to-[#1A3A5C] text-white px-4 pt-12 pb-6 safe-area-top">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link to={createPageUrl('Reports')} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-semibold text-lg">Buat Berita Acara</h1>
              <p className="text-sm text-gray-300">Langkah {step} dari 3</p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-cyan-400' : 'bg-white/20'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-lg mx-auto pb-32">
        <AnimatePresence mode="wait">
          {/* Step 1: Customer Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pelanggan</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Pelanggan</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.customer_id}
                    onChange={(e) => handleInputChange('customer_id', e.target.value)}
                    placeholder="Contoh: IDpel-52847291"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pelanggan</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => handleInputChange('customer_name', e.target.value)}
                  placeholder="Nama lengkap pelanggan"
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Alamat lengkap lokasi"
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Pelanggaran</label>
                <select
                  value={formData.violation_type}
                  onChange={(e) => handleInputChange('violation_type', e.target.value)}
                  className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="">Pilih jenis pelanggaran</option>
                  {violationTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Dokumentasi Foto</h2>
              <p className="text-sm text-gray-500 mb-4">Ambil minimal 4 foto dari sudut berbeda sebagai bukti</p>

              <div className="grid grid-cols-2 gap-3">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                    <img src={photo} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <button
                  onClick={handlePhotoCapture}
                  className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-cyan-500 hover:text-cyan-500 transition-colors"
                >
                  <Camera className="w-8 h-8 mb-2" />
                  <span className="text-sm">Tambah Foto</span>
                </button>
              </div>

              {formData.photos.length < 4 && (
                <div className="p-3 bg-amber-50 rounded-xl">
                  <p className="text-sm text-amber-700">Rekomendasi: Ambil foto dari 4 sudut berbeda (depan, belakang, kiri, kanan)</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Deskripsi Temuan</h2>
                <button
                  onClick={generateAIDescription}
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-500 to-violet-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                >
                  {isGenerating ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Generate AI
                </button>
              </div>

              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Deskripsikan temuan di lapangan secara detail..."
                rows={8}
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 resize-none"
              />

              {formData.findings && (
                <div className="p-4 bg-cyan-50 rounded-xl">
                  <p className="text-sm font-medium text-cyan-900">Pasal yang Dilanggar:</p>
                  <p className="text-sm text-cyan-700 mt-1">{formData.findings}</p>
                </div>
              )}

              {/* Summary */}
              <div className="bg-gray-100 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 mb-3">Ringkasan Berita Acara</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID Pelanggan</span>
                    <span className="font-medium">{formData.customer_id || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nama</span>
                    <span className="font-medium">{formData.customer_name || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jenis Pelanggaran</span>
                    <span className="font-medium">
                      {violationTypes.find(v => v.value === formData.violation_type)?.label || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jumlah Foto</span>
                    <span className="font-medium">{formData.photos.length} foto</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 safe-area-bottom">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Kembali
            </button>
          )}
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Lanjut
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
              <Send className="w-5 h-5" />
              Ajukan BA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}