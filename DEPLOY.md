# Panduan Deployment Chatbot AP2T

Aplikasi ini menggunakan **Vite + React** dan siap dideploy ke **Vercel**.

## 1. Persiapan Repository
Pastikan kode sudah dipush ke GitHub.
```bash
git push -u origin main
```

## 2. Deployment ke Vercel

1.  Buka [Vercel Dashboard](https://vercel.com/dashboard).
2.  Klik **"Add New..."** -> **"Project"**.
3.  Import repository GitHub `chatbotz-panduan`.
4.  **Configuration**:
    *   **Framework Preset**: Vite (biasanya terdeteksi otomatis)
    *   **Root Directory**: `./` (default)
    *   **Environment Variables**:
        *   Key: `VITE_NEBIUS_API_KEY`
        *   Value: `eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExNDE3OTYwNTEwMjcyNDQ2MjIxNyIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTkxMjY3MDg1MCwidXVpZCI6IjE5OWE1YWM5LTFiMjQtNDQ1Zi1hNDFmLTJjNGE0MDdlMzU5MCIsIm5hbWUiOiJNQ1AiLCJleHBpcmVzX2F0IjoiMjAzMC0wOC0xMVQwOToyNzozMCswMDAwIn0.ajJ9NJVIqpQSb6so-xJsSn0Img9EYCO8XTopZUYuHRA`
        *(Copy key yang Anda berikan)*
5.  Klik **Deploy**.

## 3. Menjalankan Lokal
Jika ingin menjalankan di komputer lokal:
1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Buat file `.env` (lihat `.env.example`) dan isi API Key.
3.  Jalankan server:
    ```bash
    npm run dev
    ```

## 4. Fitur Demo (Mockup Mode)
Aplikasi ini memiliki "Happy Path" mockup untuk kestabilan demo:
*   **Prompt**: "Cara memeriksa meter hexing" -> Trigger mockup knowledge base.
*   **Image**: Upload foto meter -> Trigger mockup analysis (jika prompt mengandung "periksa" atau "bypass").
*   Jika tidak match mockup, aplikasi akan memanggil **Nebius AI asli** menggunakan API Key.
