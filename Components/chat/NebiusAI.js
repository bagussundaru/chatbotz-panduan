// Nebius AI Integration
const NEBIUS_API_KEY = import.meta.env.VITE_NEBIUS_API_KEY;
const NEBIUS_BASE_URL = 'https://api.studio.nebius.ai/v1';

// Models configuration
export const MODELS = {
  CHAT: 'Qwen/Qwen2.5-Coder-32B-Instruct', // Using a more accessible model
  VISION: 'Qwen/Qwen2-VL-72B-Instruct',
  EMBEDDING: 'BAAI/bge-multilingual-gemma2'
};

import { mockKnowledgeBase } from '@/src/data/mockKnowledgeBase';

/**
 * Mencari jawaban di Mock Knowledge Base (Local Fast Path)
 * Algoritma pencarian keyword sederhana namun efektif untuk demo
 */
function findInMockKnowledge(query) {
  const lowerQuery = query.toLowerCase();

  // 1. Cek skenario spesifik demo (Exact rules)
  if (lowerQuery.includes('periksa') && lowerQuery.includes('hexing')) {
    return {
      content: mockKnowledgeBase.demoScenarios.analysis_periksa.content,
      sources: mockKnowledgeBase.demoScenarios.analysis_periksa.sources
    };
  }

  // 2. Scan semua kategori
  const allDocs = [
    ...mockKnowledgeBase.troubleshooting,
    ...mockKnowledgeBase.regulasi,
    ...mockKnowledgeBase.safety
  ];

  // Cari dokumen dengan keyword matching tertinggi
  let bestMatch = null;
  let maxScore = 0;

  for (const doc of allDocs) {
    let score = 0;
    doc.keywords.forEach(keyword => {
      if (lowerQuery.includes(keyword)) score++;
    });

    if (score > maxScore) {
      maxScore = score;
      bestMatch = doc;
    }
  }

  // Threshold: Minimal 1 keyword cocok (bisa dinaikkan)
  if (maxScore >= 1 && bestMatch) {
    return {
      content: bestMatch.content,
      sources: [`Knowledge Base: ${bestMatch.title}`]
    };
  }

  return null;
}

/**
 * Simulasi Vision AI Analysis dengan Mock Data
 */
export async function analyzeImageWithMock(scene) {
  // Simulasi delay biar berasa mikir
  await new Promise(resolve => setTimeout(resolve, 2500));

  if (scene === 'periksa') {
    return mockKnowledgeBase.demoScenarios.analysis_periksa;
  } else if (scene === 'bypass') {
    return mockKnowledgeBase.demoScenarios.analysis_bypass;
  }

  // Default fallback jika gambar tidak dikenali polanya
  return null;
}

// System prompt for P2TL assistant
const SYSTEM_PROMPT = `Anda adalah Asisten Digital P2TL (Pengusahaan, Pengaturan Beban dan Transaksi Tenaga Listrik) dari PLN ICON Plus.

Keahlian Anda:
- Troubleshooting meter listrik dan kode error
- Prosedur dan regulasi P2TL
- Panduan keselamatan kerja (K3)
- Pembuatan Berita Acara
- Identifikasi pencurian listrik dan pelanggaran

Gaya komunikasi:
- Profesional namun mudah dipahami
- Berikan langkah-langkah konkret dan terstruktur
- Selalu sebutkan pasal/regulasi yang relevan
- Tekankan aspek keselamatan kerja

Jika informasi tidak ada dalam konteks, katakan dengan jelas dan sarankan untuk berkonsultasi dengan supervisor atau dokumen resmi.`;

/**
 * Chat with Nebius AI (Hybrid Mode: Mock First, API Fallback)
 */
export async function chatWithNebius(messages, temperature = 0.7, maxTokens = 2000) {

  // 1. Cek Mock Data dulu (Fast Path)
  const lastUserMessage = messages[messages.length - 1].content;
  const mockResult = findInMockKnowledge(lastUserMessage);

  if (mockResult) {
    // Simulasi delay network kecil agar natural (0.8 - 1.5 detik)
    const delay = Math.floor(Math.random() * 700) + 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    return {
      choices: [{ message: { content: mockResult.content } }],
      content: mockResult.content, // Helper prop
      usage: { total_tokens: 0 },
      isMock: true,
      sources: mockResult.sources
    };
  }

  // 2. Jika tidak ada di mock, baru panggil API (Slow Path)
  console.log('Mock miss, calling real API...', lastUserMessage);

  try {
    const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NEBIUS_API_KEY}`
      },
      body: JSON.stringify({
        model: MODELS.CHAT,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      throw new Error(`API Request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      ...data,
      content: data.choices[0].message.content, // Make sure to return uniform structure
      isMock: false
    };
  } catch (error) {
    console.error('Error calling Nebius AI:', error);
    throw error;
  }
}

/**
 * Analyze image with Nebius Vision
 */
export async function analyzeImageWithNebius(imageBase64, prompt) {
  try {
    const response = await fetch(`${NEBIUS_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NEBIUS_API_KEY}`
      },
      body: JSON.stringify({
        model: MODELS.VISION,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageBase64 } }
            ]
          }
        ],
        max_tokens: 1000
      })
    });

    if (!response.ok) throw new Error('Vision API failed');
    const data = await response.json();
    return {
      content: data.choices[0].message.content,
      sources: ['Vision AI Analysis']
    };
  } catch (error) {
    console.error('Vision Error:', error);
    throw error;
  }
}

/**
 * Search Knowledge Base (Legacy/Fallback)
 */
export async function searchKnowledge(query, docs, limit = 3) {
  // Basic keyword match
  const lowerQuery = query.toLowerCase();
  const scoredDocs = docs.map(doc => {
    let score = 0;
    if (doc.title && doc.title.toLowerCase().includes(lowerQuery)) score += 5;
    if (doc.content && doc.content.toLowerCase().includes(lowerQuery)) score += 1;
    return { ...doc, score };
  });

  return scoredDocs
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Build RAG Context
 */
export function buildRAGContext(docs) {
  if (!docs || docs.length === 0) return '';
  return `\n\nContext:\n${docs.map(d => `- ${d.content}`).join('\n')}`;
}