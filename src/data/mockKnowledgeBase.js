/**
 * MOCK KNOWLEDGE BASE - UNTUK DEMO
 * Berisi data statis berkualitas tinggi untuk simulasi RAG yang cerdas dan cepat.
 */

export const mockKnowledgeBase = {
  // 1. DATA TROUBLESHOOTING METER
  troubleshooting: [
    {
      keywords: ['hexing', 'periksa', 'tamper', 'tanda tangan', 'error'],
      title: 'Penanganan Indikasi Tamper pada Meter Hexing HXE116-KP',
      content: `
Jika meter Hexing menampilkan tulisan "Periksa" atau simbol tangan (tamper), lakukan langkah berikut:

1. **Cek Fisik Segel**: Pastikan segel terminal dan segel MCB dalam kondisi utuh dan sesuai standar.
2. **Cek Wiring**: Periksa apakah ada kabel jumper atau bypass pada terminal.
3. **Cek Kode Tamper**: Tekan kode 801 Enter untuk melihat riwayat tamper terakhir.
   - Status 01: Cover Open (Tutup terminal dibuka)
   - Status 02: Reverse Power (Arus terbalik)
   - Status 03: Magnetic Influence (Indikasi magnet)

**Solusi**:
- Jika instalasi aman: Masukkan Clear Tamper Token (20 digit) yang didapat dari supervisor/posko.
- Jika ditemukan pelanggaran: Amankan barang bukti dan buat Berita Acara (BA) P2TL.
      `,
      category: 'troubleshooting'
    },
    {
      keywords: ['itron', 'ace6000', 'layar mati', 'blank'],
      title: 'Troubleshooting Layar Mati pada Meter Itron ACE6000',
      content: `
Untuk kasus layar blank/mati pada meter Itron ACE6000:

1. **Cek Tegangan Masuk**: Gunakan multitester, pastikan tegangan pada terminal fasa-netral minimal 180V.
2. **Cek Baterai**: Tekan tombol display. Jika menyala sebentar lalu mati, kemungkinan baterai internal lemah (Low Battery).
3. **Reset**: Lakukan power cycle (matikan MCB hulu selama 1 menit, lalu nyalakan kembali) jika memungkinkan.

**Tindakan**:
- Jika tegangan normal tapi layar tetap mati: Meter rusak (Faulty LCD). Lakukan penggantian meter sesuai prosedur.
- Buat BA Penggantian Meter Rusak.
      `,
      category: 'troubleshooting'
    },
    {
      keywords: ['e04', 'error 04', 'gagal topup', 'token ditolak'],
      title: 'Kode Error 04: Token Ditolak / Hardware Error',
      content: `
**Arti Kode**: Error 04 biasanya menunjukkan kegagalan pada memori internal meter atau token yang dimasukkan salah/kadaluarsa.

**Langkah Diagnosa**:
1. Pastikan nomor meter pada struk token sesuai dengan ID meter fisik.
2. Pastikan urutan pemasukan token benar (jika ada token Key Change).
3. Untuk meter prabayar lama: Kemungkinan memori penuh atau corrupt.

**Solusi**:
- Jika token benar tapi ditolak: Coba masukkan kode "00 Enter" untuk cek status test.
- Jika tetap gagal: Lakukan prosedur penggantian meter (SOP-METER-09).
      `,
      category: 'troubleshooting'
    }
  ],

  // 2. DATA REGULASI P2TL (Hukum & Aturan)
  regulasi: [
    {
      keywords: ['pasal', 'pencurian', 'mempengaruhi', 'batas', 'daya'],
      title: 'Pasal Pelanggaran Mempengaruhi Batas Daya/Energi',
      content: `
**Dasar Hukum**: 
UU No. 30 Tahun 2009 tentang Ketenagalistrikan & Peraturan Direksi PLN No. 088-Z/P/DIR/2016.

**Jenis Pelanggaran (P2)**:
Mempengaruhi pengukuran energi (kWh) atau batas daya (MCB).

**Kutipan Pasal**:
"Setiap orang yang menggunakan tenaga listrik yang bukan haknya secara melawan hukum dipidana dengan pidana penjara paling lama 7 (tujuh) tahun dan denda paling banyak Rp2.500.000.000,00 (dua miliar lima ratus juta rupiah)." (Pasal 51 ayat 3 UU No. 30/2009).

**Tindakan Petugas**:
1. Catat temuan pada BA P2TL.
2. Hitung TS2 (Tagihan Susulan P2).
3. Amankan barang bukti (kabel jumper, magnet, dll).
      `,
      category: 'regulasi'
    },
    {
      keywords: ['hak', 'kewenangan', 'masuk', 'rumah'],
      title: 'Kewenangan Petugas P2TL Memasuki Persil Pelanggan',
      content: `
**Prosedur Akses Lokasi**:
Berdasarkan SOP P2TL dan SPJBTL (Surat Perjanjian Jual Beli Tenaga Listrik):

1. Petugas WAJIB menunjukkan Surat Tugas dan Tanda Pengenal resmi.
2. Pelanggan atau wakilnya BERHAK mendampingi pemeriksaan.
3. Jika pelanggan menolak/menghalang-halangi pemeriksaan:
   - Jelaskan wewenang PLN sesuai SPJBTL.
   - Jika tetap menolak, PLN berwenang melakukan pemutusan sementara aliran listrik (sebagai tindakan pengamanan aset).
   - Minta bantuan aparat kepolisian jika situasi tidak kondusif.
      `,
      category: 'regulasi'
    },
    {
      keywords: ['denda', 'perhitungan', 'tagihan susulan'],
      title: 'Dasar Perhitungan Tagihan Susulan (TS)',
      content: `
Rumus dasar Tagihan Susulan (TS) berdasarkan jenis pelanggaran:

- **Pelanggaran Golongan I (P1 - Pembatas)**:
  TS1 = 6 x (Daya Tersambung kVA) x (Biaya Beban)

- **Pelanggaran Golongan II (P2 - Pengukur)**:
  TS2 = 9 x 720 jam x (Daya Tersambung) x 0.85 x (Tarif Tertinggi)

- **Pelanggaran Golongan III (P3 - P1 + P2)**:
  TS3 = TS1 + TS2

*Catatan: Rumus di atas adalah estimasi. Gunakan Aplikasi P2TL Mobile untuk perhitungan resmi yang akurat.*
      `,
      category: 'regulasi'
    }
  ],

  // 3. DATA SOP & K3 (Safety)
  safety: [
    {
      keywords: ['hujan', 'basah', 'gardu', 'banjir'],
      title: 'SOP Pemeriksaan Saat Kondisi Basah/Hujan',
      content: `
⚠️ **PERINGATAN KESELAMATAN TINGGI**

**DILARANG KERAS** melakukan pekerjaan bertegangan (PDKB) atau menyentuh instalasi APP dalam kondisi hujan lebat atau banjir.

**Prosedur**:
1. Hentikan pekerjaan jika hujan turun. Berteduh di tempat aman.
2. Jika terpaksa melakukan pengamanan aset saat gerimis/basah:
   - WAJIB gunakan Sarung Tangan Isolasi Kelas 0 (tahan s.d 1000V).
   - Gunakan Sepatu Safety isolator yang kering.
   - Gunakan Alas Kerja isolasi (karpet karet).
3. Jangan menyentuh bagian logam/tiang listrik tanpa tes tegangan bocor (gunakan Voltage Detector).
      `,
      category: 'keselamatan'
    },
    {
      keywords: ['apd', 'wajib', 'standar'],
      title: 'Daftar APD Wajib Petugas P2TL',
      content: `
Untuk memastikan keselamatan petugas ("Berangkat Selamat, Pulang Selamat"), APD berikut WAJIB dikenakan:

1. **Helm Safety**: Dengan tali dagu terpasang (Chin Strap).
2. **Kacamata Pelindung (Safety Glasses)**: Melindungi dari percikan api/benda asing.
3. **Rompi Reflektif**: Wajib dipakai, terutama saat tugas malam hari atau di pinggir jalan.
4. **Sarung Tangan**: 
   - Kulit (untuk kerja mekanik kasar).
   - Karet Isolasi 1000V (saat berinteraksi dengan instalasi bertegangan).
5. **Sepatu Safety**: Sol tebal isolator dan pelindung jari (toe cap).
6. **ID Card & Surat Tugas**: Selalu dikalungkan/dibawa.
      `,
      category: 'keselamatan'
    }
  ],

  // 4. PRE-CANNED SCENARIOS (Untuk Demo Flow yang Mulus)
  demoScenarios: {
    // Skenario 1: Foto Meter Hexing "Periksa"
    analysis_periksa: {
      content: `
**Analisis Gambar Meter Listrik:**

1. **Identifikasi Aset**:
   - Merk: **Hexing**
   - Tipe: HXE116-KP (Prabayar 1 Fasa)
   - No. Meter: 32128944512

2. **Kondisi Visual**:
   - Layar LCD menampilkan teks **"Periksa"**.
   - Ikon **Tangan** (Tamper) menyala di pojok kiri atas.
   - Segel terminal terlihat utuh (visual).

3. **Diagnosa AI**:
   Meter dalam status **TAMPER / Blocked**. Ini disebabkan oleh salah satu hal berikut:
   - Tutup terminal pernah dibuka saat bertegangan (Cover Open).
   - Terdeteksi arus terbalik (Reverse Power) atau wiring terbalik.

4. **Saran Tindakan**:
   1. Lakukan pemeriksaan kabel di terminal (pastikan fasa-netral tidak tertukar).
   2. Jika instalasi aman, minta **Token Clear Tamper (CT)** ke supervisor.
   3. Masukkan 20 digit token CT untuk mereset meter.
      `,
      sources: ['Manual Hexing v2.1', 'SOP Penanganan Gangguan Meter']
    },

    // Skenario 2: Foto Jumper Kabel (Pencurian)
    analysis_bypass: {
      content: `
⚠️ **PERINGATAN: TERDETEKSI INDIKASI PELANGGARAN**

**Analisis Visual Vision AI**:
1. **Objek**: Terminal Meter kWh 1 Fasa.
2. **Anomali**: Terlihat kabel tambahan (warna hitam) yang menghubungkan sisi fasa input langsung ke fasa output (bypass MCB/Meter).

**Kesimpulan**:
Indikasi kuat **Pelanggaran Golongan P2 (Mempengaruhi Pengukuran)** dengan modus *Jumper Wiring*.

**Prosedur Penindakan (SOP P2TL)**:
1. **JANGAN SENTUH** barang bukti sebelum didokumentasikan.
2. Foto dari 4 sudut (close up jumper, view meter utuh, view rumah, view tiang).
3. Ukur arus pada kabel jumper menggunakan Clamp Meter (Tang Ampere).
4. Amankan kabel jumper sebagai Barang Bukti (BB).
5. Buat Berita Acara (BA) P2TL Golongan P2.
      `,
      sources: ['SOP P2TL 2024', 'UU No 30/2009 Pasal 51']
    }
  }
};
