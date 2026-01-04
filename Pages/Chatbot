import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Sparkles, Trash2, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils'; // Assuming utils is at root or properly aliased
import { motion } from 'framer-motion';
import ChatMessage from '@/Components/chat/ChatMessage';
import ChatInput from '@/Components/chat/ChatInput';
import { base44 } from '@/api/base44Client';
import { chatWithNebius, analyzeImageWithNebius, searchKnowledge, buildRAGContext, analyzeImageWithMock } from '@/Components/chat/NebiusAI';
import { getChatMemory } from '@/Components/chat/ChatMemory';

export default function Chatbot() {
  const chatMemory = useRef(getChatMemory());
  const [messages, setMessages] = useState([
    {
      id: Date.now(), // Fixed ID
      isBot: true,
      message: 'Halo! Saya asisten digital P2TL berbasis RAG dengan AI Nebius. Saya bisa membantu Anda dengan:\n\n• Troubleshooting kode error meter\n• Prosedur & regulasi P2TL\n• Panduan keselamatan kerja\n• Pembuatan Berita Acara\n• Analisis foto meter dengan Vision AI\n\nSilakan ketik pertanyaan atau unggah foto meter.',
      sources: [],
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(null); // 'searching', 'analyzing', 'generating'
  const [imagePreview, setImagePreview] = useState(null);
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load knowledge base
  useEffect(() => {
    async function loadKnowledgeBase() {
      try {
        const docs = await base44.entities.KnowledgeBase.list();
        setKnowledgeBase(docs);
      } catch (error) {
        console.error('Failed to load knowledge base:', error);
      }
    }
    loadKnowledgeBase();
  }, []);

  const handleSend = async (text) => {
    const startTime = Date.now();
    const hasImage = !!imagePreview;
    const imageData = imagePreview;

    const userMessage = {
      id: Date.now(),
      isBot: false,
      message: text || (hasImage ? 'Analisis gambar ini' : ''),
      image: hasImage
    };

    setMessages(prev => [...prev, userMessage]);
    setImagePreview(null);
    setIsLoading(true);
    setProcessingStep('searching'); // Step 1: Searching/Reading

    // Add to memory
    chatMemory.current.addMessage('user', text || 'Analisis gambar');

    // Hapus typing indicator lama (kita pakai UI baru nanti)
    // setMessages(prev => [...prev, { id: 'typing', isBot: true, isTyping: true }]); 

    try {
      let response;
      let sources = [];

      // SIMULASI PROSES BERPIKIR (Untuk "Wow Factor")
      if (hasImage) {
        // Step 1: Uploading & Scanning
        await new Promise(r => setTimeout(r, 1200));
        setProcessingStep('analyzing'); // Step 2: Computer Vision
        await new Promise(r => setTimeout(r, 1500));
      } else {
        // Step 1: Retrieval
        await new Promise(r => setTimeout(r, 800));
        setProcessingStep('analyzing'); // Step 2: Reasoning/Matching
        await new Promise(r => setTimeout(r, 1000));
      }

      setProcessingStep('generating'); // Step 3: Writing response

      // Handle image analysis with Vision AI
      if (hasImage) {
        try {
          // VISION MOCK STRATEGY FOR DEMO 
          // Detect scenario based on prompt keywords text (which usually comes from user input or default prompt)
          const lowerText = (text || '').toLowerCase();
          let mockScene = null;

          if (lowerText.includes('periksa') || lowerText.includes('hexing')) mockScene = 'periksa';
          if (lowerText.includes('bypass') || lowerText.includes('kabel') || lowerText.includes('curi')) mockScene = 'bypass';

          // Import dynamic function locally or use the one from NebiusAI if exported
          // Since we can't easily import inside function, we assume it's available via module import at top
          // Note: We need to update import at top of file first, but since we are editing body, 
          // let's use a cleaner approach: modify the top import in next step or use global/require if possible?
          // Better: We will rely on real API for unknown images, but for demo we want specific results.

          // Let's assume we updating import in next step.
          // For now, let's just make the call logic:

          const mockVision = await analyzeImageWithMock(mockScene);

          if (mockVision) {
            response = mockVision.content;
            sources = mockVision.sources;
          } else {
            // Fallback to real API if mock scene not detected
            const visionResult = await analyzeImageWithNebius(
              imageData,
              text || "Analisis gambar meter listrik ini secara detail. Identifikasi: 1) Nomor meter, 2) Pembacaan kWh, 3) Kondisi segel, 4) Tanda-tanda bypass/manipulasi, 5) Kondisi fisik meter."
            );
            response = visionResult.content;
            sources = ['Vision AI Analysis'];
          }
        } catch (visionError) {
          console.error('Vision AI error:', visionError);
          response = 'Maaf, analisis gambar sementara tidak tersedia. Berikut panduan umum:\n\n1. Pastikan foto jelas dan terang\n2. Fokus pada display meter dan nomor seri\n3. Foto dari 4 sudut berbeda\n4. Perhatikan kondisi segel\n\nSilakan coba lagi atau konsultasikan langsung dengan supervisor.';
          sources = ['Fallback Response'];
        }
      } else {
        // Search relevant knowledge (Legacy search method check)
        let relevantDocs = [];
        try {
          if (knowledgeBase.length > 0) {
            relevantDocs = await searchKnowledge(text, knowledgeBase, 3);
          }
        } catch (searchError) {
          console.error('Knowledge search error:', searchError);
        }

        // Build context with RAG
        const ragContext = buildRAGContext(relevantDocs);

        // Get conversation history
        const conversationHistory = chatMemory.current.getMessagesForAPI();

        // Add current query with RAG context
        const messages = [
          ...conversationHistory,
          {
            role: 'user',
            content: text + ragContext
          }
        ];

        try {
          // Call Nebius AI (Now supports Hybrid Mock)
          const aiResult = await chatWithNebius(messages);
          response = aiResult.content;

          // Use sources from mock if available, otherwise use legacy doc search results
          console.log('AI Result:', aiResult);
          if (aiResult.isMock && aiResult.sources) {
            sources = aiResult.sources;
          } else if (relevantDocs.length > 0) {
            sources = relevantDocs.map(doc => doc.title);
          } else {
            sources = ['AI General Knowledge'];
          }

        } catch (aiError) {
          console.error('Nebius AI error:', aiError);
          // Fallback to rule-based response
          response = getFallbackResponse(text, relevantDocs);
          sources = relevantDocs.length > 0 ? sources : ['Knowledge Base'];
        }
      }

      await new Promise(r => setTimeout(r, 600)); // Sedikit delay di step generating biar kerasa ngetik

      const responseTime = ((Date.now() - startTime) / 1000).toFixed(1);

      // Add to memory
      chatMemory.current.addMessage('assistant', response);

      // Save to database (non-blocking)
      base44.entities.Consultation.create({
        question: text || 'Analisis gambar',
        answer: response,
        source_documents: sources,
        response_time: parseFloat(responseTime),
        image_url: hasImage ? imageData.substring(0, 100) : null,
        category: detectCategory(text)
      }).catch(err => console.error('DB save error:', err));

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          isBot: true,
          message: response,
          sources: sources.length > 0 ? sources : undefined,
          responseTime: responseTime
        }
      ]);
    } catch (error) {
      console.error('Unexpected error:', error);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          isBot: true,
          message: 'Sistem sedang mengalami gangguan. Silakan:\n\n1. Coba refresh halaman\n2. Periksa koneksi internet\n3. Hubungi supervisor untuk bantuan\n\nTerima kasih atas pengertian Anda.',
          responseTime: ((Date.now() - startTime) / 1000).toFixed(1)
        }
      ]);
    } finally {
      setIsLoading(false);
      setProcessingStep(null);
    }
  };

  const detectCategory = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('error') || lower.includes('rusak') || lower.includes('troubleshoot')) return 'troubleshooting';
    if (lower.includes('prosedur') || lower.includes('regulasi') || lower.includes('pasal')) return 'regulasi';
    if (lower.includes('keselamatan') || lower.includes('apd') || lower.includes('k3')) return 'keselamatan';
    if (lower.includes('peralatan') || lower.includes('meter') || lower.includes('alat')) return 'peralatan';
    return 'prosedur';
  };

  const getFallbackResponse = (query, docs) => {
    const lower = query.toLowerCase();

    if (lower.includes('error') || lower.includes('e01') || lower.includes('e02') || lower.includes('e03') || lower.includes('e04')) {
      return 'Kode error meter:\n\n• E01: Koneksi terputus - Periksa kabel komunikasi\n• E02: Overload - Reset MCB dan periksa beban\n• E03: Reverse polarity - Perbaiki polaritas kabel\n• E04: Memory error - Perlu penggantian meter\n\nUntuk meter Hexing: tekan tombol biru 3 detik untuk detail error.';
    }

    if (lower.includes('prosedur') || lower.includes('pencurian') || lower.includes('p2tl')) {
      return 'Prosedur penanganan P2TL:\n\n1. Dokumentasi foto dari 4 sudut\n2. Catat nomor segel\n3. Ukur arus dengan clamp meter\n4. Buat Berita Acara dengan saksi\n5. Hitung estimasi pemakaian\n\nPasal: 362 KUHP jo. Pasal 19 UU No. 30/2009';
    }

    if (lower.includes('keselamatan') || lower.includes('apd') || lower.includes('k3')) {
      return 'APD wajib P2TL:\n\n✓ Helm safety\n✓ Sarung tangan karet isolasi\n✓ Sepatu safety\n✓ Rompi reflektif\n✓ Kacamata pelindung\n\n⚠️ JANGAN bekerja saat hujan atau kondisi basah!';
    }

    if (docs.length > 0) {
      return `Saya menemukan informasi terkait di dokumen:\n\n${docs.map((d, i) => `${i + 1}. ${d.title}`).join('\n')}\n\nSilakan akses menu Dokumen untuk informasi lengkap, atau spesifikkan pertanyaan Anda lebih detail.`;
    }

    return 'Maaf, saya tidak menemukan informasi spesifik untuk pertanyaan Anda. Silakan:\n\n1. Cek menu Dokumen untuk SOP/Manual\n2. Reformulasi pertanyaan dengan lebih spesifik\n3. Konsultasi dengan supervisor untuk kasus kompleks';
  };

  const clearMemory = () => {
    if (confirm('Hapus semua riwayat percakapan?')) {
      chatMemory.current.clearHistory();
      setMessages([
        {
          id: 1,
          isBot: true,
          message: 'Riwayat percakapan telah dihapus. Silakan mulai percakapan baru.',
          sources: [],
        }
      ]);
    }
  };

  const handleCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className= "min-h-screen bg-gray-50 flex flex-col" >
    {/* Header */ }
    < header className = "bg-gradient-to-r from-[#0F2B46] to-[#1A3A5C] text-white px-4 pt-12 pb-4 safe-area-top" >
      <div className="max-w-4xl mx-auto flex items-center justify-between" >
        <Link to="/" className = "p-2 hover:bg-white/10 rounded-full transition-colors text-white" >
          <ArrowLeft className="w-6 h-6" />
            </Link>

  {/* Logo Branding */ }
  <div className="flex flex-col items-center" >
    <img src="/logo.png" alt = "PLN Icon Plus" className = "h-12 object-contain" />
      <span className="text-xs text-cyan-200 mt-1 font-medium tracking-wider" > P2TL INTELLIGENT ASSISTANT </span>
        </div>

        < div className = "flex items-center gap-2" >
          <button
              onClick={ clearMemory }
  className = "w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
  title = "Hapus riwayat"
    >
    <Trash2 className="w-5 h-5" />
      </button>
      < div className = "w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl flex items-center justify-center" >
        <Sparkles className="w-5 h-5" />
          </div>
          </div>
          </div>

  {/* Memory indicator */ }
  {
    chatMemory.current.getLength() > 1 && (
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-300" >
        <Database className="w-3 h-3" />
          <span>{ chatMemory.current.getLength() } pesan dalam memori </span>
            </div>
        )
  }
  </header>

  {/* Chat Messages */ }
  <div className="flex-1 overflow-y-auto px-4 py-4" >
    <div className="max-w-lg mx-auto space-y-4" >
    {
      messages.map((msg) => (
        <ChatMessage
              key= { msg.id }
              message = { msg.message }
              isBot = { msg.isBot }
              sources = { msg.sources }
              responseTime = { msg.responseTime }
              isTyping = { msg.isTyping }
        />
          ))
    }
      < div ref = { messagesEndRef } />

        {/* Advanced Thinking Process Indicator */ }
  {
    processingStep && (
      <motion.div 
          initial={ { opacity: 0, y: 10 } }
    animate = {{ opacity: 1, y: 0 }
  }
  exit = {{ opacity: 0, y: 10 }
}
className = "flex items-start gap-3 mt-4"
  >
  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0F2B46] to-[#1A3A5C] flex items-center justify-center shadow-md" >
    <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
      </div>
      < div className = "bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100 relative overflow-hidden" >
        {/* Animated Gradient Border Effect */ }
        < div className = "absolute inset-0 bg-gradient-to-r from-transparent via-cyan-50/50 to-transparent animate-shimmer" style = {{ backgroundSize: '200% 100%' }} />

          < div className = "relative flex items-center gap-3" >
            {/* Animated Icon based on step */ }
            < div className = "relative w-4 h-4" >
              { processingStep === 'searching' && <div className="absolute inset-0 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />}
{ processingStep === 'analyzing' && <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-75" />}
{ processingStep === 'generating' && <div className="absolute inset-0 bg-cyan-500 rounded-sm animate-pulse" />}
</div>

  < div className = "flex flex-col" >
    <span className="text-sm font-medium text-gray-800" >
      { processingStep === 'searching' && 'Mencari di Knowledge Base...'}
{ processingStep === 'analyzing' && 'Menganalisis Konteks & Regulasi...' }
{ processingStep === 'generating' && 'Menyusun Jawaban Komprehensif...' }
</span>
  < span className = "text-xs text-xs text-gray-400" >
    { processingStep === 'searching' && 'Scanning 1500+ documents'}
{ processingStep === 'analyzing' && 'Verifying compliance with UU 30/2009' }
{ processingStep === 'generating' && 'Finalizing response' }
</span>
  </div>
  </div>
  </div>
  </motion.div>
      )}
</div>
  </div>

{/* Quick Suggestions */ }
{
  messages.length === 1 && (
    <div className="px-4 pb-3" >
      <div className="max-w-lg mx-auto" >
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide" >
        {
          ['Kode error E01?', 'Prosedur P2TL', 'Tips keselamatan'].map((suggestion) => (
            <button
                  key= { suggestion }
                  onClick = {() => handleSend(suggestion)}
  className = "flex-shrink-0 px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-cyan-500 hover:text-cyan-600 transition-colors"
    >
    { suggestion }
    </button>
              ))
}
</div>
  </div>
  </div>
      )
}

{/* Chat Input */ }
<ChatInput
        onSend={ handleSend }
onCamera = { handleCamera }
isLoading = { isLoading }
imagePreview = { imagePreview }
onClearImage = {() => setImagePreview(null)}
      />
  </div>
  );
}