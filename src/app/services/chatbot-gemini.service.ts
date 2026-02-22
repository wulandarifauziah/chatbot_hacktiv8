import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../../environments/environment';

export interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatHistoryItem {
  role: string;
  parts: Array<{ text: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotGeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isInitialized: boolean = false;

  private systemContext = `Anda adalah EduAssist, asisten virtual kampus. 
Jawablah dengan ramah, informatif, dan gunakan format daftar ke bawah (vertikal).
Selalu gunakan emoji yang relevan.`;

  constructor() {
    this.initializeAI();
  }

  private initializeAI() {
    const apiKey = environment.geminiApiKey;
    if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
          model: 'gemini-2.0-flash',
          systemInstruction: this.systemContext
        });
        this.isInitialized = true;
        console.log('✅ Gemini AI initialized');
      } catch (error) {
        console.error('❌ Failed to initialize Gemini AI:', error);
        this.isInitialized = false;
      }
    } else {
      this.isInitialized = false;
    }
  }

  async sendMessage(userMessage: string): Promise<{ answer: string }> {
    if (!this.isInitialized || !this.model) {
      return this.getFallbackResponse(userMessage);
    }

    try {
      const result = await this.model.sendMessage(userMessage);
      const text = result.response.text();
      return { answer: text };
    } catch (error) {
      return this.getFallbackResponse(userMessage);
    }
  }

  private getFallbackResponse(userMessage: string): { answer: string } {
    const normalizedMessage = userMessage.toLowerCase();

    const responses: { [key: string]: string } = {
      'menu': `👋 **Halo! Saya EduAssist**
Asisten virtual Anda.

Silakan pilih topik:
---
📅 **Jadwal Kuliah**
📝 **KRS & IRS**
📊 **Nilai & KHS**
🎓 **PKL & Skripsi**
💰 **UKT & Bayar**
💳 **KTM & Akun**
✨ **Beasiswa**
📚 **Perpustakaan**
🔄 **Cuti Kuliah**
---
Atau ketik langsung
pertanyaan Anda!`,

      'jadwal': `📅 **Jadwal Kuliah**

Cara cek jadwal:
1. Login **SIAKAD**
2. Menu **Akademik**
3. Klik **Jadwal Kuliah**

**Penting:**
• Cek Kode Ruangan
• Cek Nama Gedung
• Pastikan KRS di-ACC

Update ruangan cek di
mading digital prodi.`,

      'krs': `📝 **Panduan KRS**

Langkah-langkah:
1. Bayar UKT (Lunas)
2. Login Portal
3. Pilih **Input KRS**
4. Pilih Matakuliah
5. Klik **Finalisasi**

**Kendala?**
Hubungi Dosen Wali jika kelas penuh.`,

      'irs': `📋 **Informasi IRS**

IRS adalah bukti sah
semester aktif.

Cara ambil:
• Login SIAKAD
• Pilih Menu IRS
• Simpan file PDF

Bawa print-out IRS
saat UTS dan UAS.`,

    'nilai': `📊 **Cek Nilai & IPK**

**A. Cara Cek KHS (Nilai Semester):**
1. Login ke **Portal SIAKAD**
2. Klik Menu **Akademik**
3. Pilih **Laporan Hasil Studi**
4. Pilih **Semester** yang ingin dilihat
5. Klik **Tampilkan KHS**

**B. Cara Cek Transkrip (Semua Nilai):**
1. Pilih Menu **Akademik**
2. Klik **Transkrip Nilai**
3. Cek kolom **IPK Kumulatif** di bagian paling bawah

**⚠️ Ada Nilai Salah/Belum Keluar?**
1. Hubungi **Dosen Pengampu** matkul terkait
2. Sertakan bukti tugas/kehadiran
3. Batas sanggah: **Maksimal 14 hari** setelah nilai rilis di sistem.

*Nilai yang sudah masuk ke Transkrip tidak bisa diubah tanpa persetujuan Dekan.*`,

'pkl': `⚒️ **Informasi PKL**

Prosedur Magang:
1. Cek Syarat SKS
2. Ajukan Surat Izin
   (di Admin Prodi)
3. Cari Instansi/Perusahaan
4. Mulai Praktik Kerja

**Unduh Format PKL:**
👇 Klik Link Resmi:
<a href="https://share.google/La03Kvx03yQGppr8v" target="_blank" style="color: #3b82f6; text-decoration: underline; font-weight: bold;">[Download Format Laporan PKL]</a>


*Laporan wajib dikumpul
max 2 minggu setelah PKL.*`,

'skripsi': `🎓 **Panduan Lengkap Skripsi**

**1. Tahap Awal & Bimbingan**
• Ajukan judul melalui Portal/Kaprodi.
• Pastikan sudah lulus matkul Metopel.
• Bimbingan rutin (Minimal 8x bimbingan).
• Pastikan Draft sudah di-ACC Dosen Penguji & Pembimbing.

**2. Syarat Daftar Sidang (Munaqasyah)**
Lengkapi berkas berikut:
✅ Transkrip nilai (Tidak ada nilai E).
✅ Sertifikat TOEFL/IKLA minimal skor 450.
✅ Bukti bebas pustaka.
✅ Form bimbingan yang sudah di-ACC.
✅ Naskah skripsi (Jilid plastik/softcopy).

**3. Cara Daftar Sidang Online**
1. Login ke **SIAKAD**.
2. Pilih Menu **Tugas Akhir**.
3. Klik **Pendaftaran Ujian/Sidang**.
4. Upload berkas PDF yang diminta.
5. Tunggu validasi dari Admin Prodi untuk jadwal sidang.

**4. Pasca Sidang (Yudisium)**
• Revisi skripsi (Max 14 hari).
• Tanda tangan pengesahan.
• Upload mandiri ke Repositori Kampus.

**📥 Dokumen & Template:**
👉 <a href="https://share.google/IU4CUxiDoFTLWXrPO" target="_blank" style="color: #3b82f6; font-weight: bold;">[Download Format Skripsi]</a>

*Gunakan margin 4-4-3-3 & Times New Roman 12.*`,

      'ukt': `💰 **Pembayaran UKT**

**Langkah:**
1. Cek tagihan di Portal
2. Salin nomor VA
3. Bayar via Bank/ATM

**Keringanan:**
Ajukan cicilan ke Rektorat sebelum masa KRS ditutup.`,

      'beasiswa': `✨ **Info Beasiswa**

Opsi bantuan dana:
• **KIP-Kuliah**
• **Beasiswa PPA**
• **Beasiswa Mitra**

Info lengkap cek dibawah ini:
<a href="https://indbeasiswa.com/" target="_blank style="color: #3b82f6; text-decoration: underline; font-weight: bold;">[Info Beasiswa]</a>`,

      'ktm': `💳 **Urusan KTM**

**KTM Hilang:**
1. Lapor Kepolisian
2. Bawa suratnya ke
   Biro Akademik
3. Cetak ulang

**KTM Digital:**
Cek di aplikasi mobile.`,

      'password': `🔑 **Masalah Login**

**Lupa Password?**
Klik 'Lupa Password'
di layar login portal.

**Masih Gagal?**
Hubungi Admin IT
di Gedung Rektorat
dengan membawa KTM.`,

      'perpustakaan': `📚 **Perpustakaan**

Layanan:
• Pinjam Buku
• Akses E-Journal
• Ruang Belajar

**Jam Operasional:**
Senin - Jumat
08.00 - 16.00 WIB`,

      'cuti': `🔄 **Pengajuan Cuti Kuliah**

**Syarat Cuti:**
1. Minimum sudah kuliah 2 semester
2. Tidak ada mata kuliah dengan nilai E
3. Tidak ada tunggakan UKT

**Langkah Pengajuan:**
1. Login ke **SIAKAD**
2. Menu **Akademik**
3. Pilih **Pengajuan Cuti**
4. Isi formulir online
5. Unggah dokumen pendukung
6. Tunggu persetujuanDosen Wali & Kaprodi

**⏰ Batas Pengajuan:**
Maksimal **2 minggu** sebelum UTS dimulai.

**Catatan:**
• Cuti max 2 semester
• Tetap dapat akses kuliah online
• UKT tetap dibayar sesuai ketentuan`,

      'faq': `❓ **Tanya Jawab**

• Cek KRS? Ketik 'KRS'
• Cek IPK? Ketik 'Nilai'
• Skripsi? Ketik 'Skripsi'
• Bayar? Ketik 'UKT'`
    };

    for (const [keyword, response] of Object.entries(responses)) {
      if (normalizedMessage.includes(keyword)) {
        return { answer: response };
      }
    }

    return {
      answer: `Maaf, saya tidak mengerti. 🙏

Coba ketik kata kunci:
• **KRS**
• **Jadwal**
• **UKT**
• **Skripsi**

Atau ketik **'menu'**
untuk bantuan lengkap! 😊`
    };
  }

  isAIInitialized(): boolean {
    return this.isInitialized;
  }

  resetChat() {
    // Implementasi reset history jika diperlukan
  }
}