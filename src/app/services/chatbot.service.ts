import { Injectable } from '@angular/core';

export interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface QuickReply {
  label: string;
  action: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private qaData: { [key: string]: { answer: string; quickReplies?: QuickReply[] } } = {
    // MENU UTAMA
    'menu': {
      answer: 'Halo! Saya asisten virtual SIAKAD/AIS Campus. Pilih kategori di bawah ini untuk memulai:',
      quickReplies: [
        { label: '📚 Administrasi & Akademik', action: 'akademik' },
        { label: '🎓 Jalur Akhir (PKL/Skripsi)', action: 'akhir' },
        { label: '💼 Layanan Mahasiswa', action: 'layanan' },
        { label: '❓ FAQ Umum', action: 'faq' }
      ]
    },

    // ADMINISTRASI & AKADEMIK
    'akademik': {
      answer: '📚 *ADMINISTRASI & AKADEMIK*\n\nPilih subjek di bawah:',
      quickReplies: [
        { label: '📅 Jadwal Perkuliahan', action: 'jadwal' },
        { label: '📝 Panduan KRS', action: 'krs' },
        { label: '📅 Kalender Akademik', action: 'kalender' },
        { label: '📊 Nilai & Transkrip', action: 'nilai' },
        { label: '🔄 Cuti & Aktif Kuliah', action: 'cuti' },
        { label: '🔙 Kembali ke Menu', action: 'menu' }
      ]
    },

    'jadwal': {
      answer: '📅 *JADWAL PERKULIAHAN*\n\nUntuk melihat jadwal perkuliahan:\n\n1. Login ke SIAKAD/AIS\n2. Pilih menu "Jadwal Kuliah"\n3. Pilih semester yang diinginkan\n4. Anda dapat melihat:\n   - Jadwal harian perminggu\n   - Jadwal per hari\n   - Lokasi ruangan\n   - Nama dosen\n\n💡 Tips: Jadwal terbaru biasanya diupdate setiap awal semester.',
      quickReplies: [
        { label: '📝 Panduan KRS', action: 'krs' },
        { label: '📅 Kalender Akademik', action: 'kalender' },
        { label: '🔙 Kembali', action: 'akademik' }
      ]
    },

    'krs': {
      answer: '📝 *PANDUAN KRS (Kartu Rencana Studi)*\n\n📌 *Langkah-langkah Pengisian KRS:*\n1. Login ke SIAKAD/AIS\n2. Pilih menu "KRS Online"\n3. Pilih semester yang akan diambil\n4. Pilih mata kuliah yang diinginkan\n5. Simpan dan cetak KRS\n\n⚠️ *Solusi Jika Mata Kuliah Penuh:*\n1. Hubungi dosen pengampu untuk添加位置\n2. Tunggu masa adjustmen\n3. Pilih mata kuliah pengganti\n4. Konsultasi dengan dosen wali\n\n📅 *Jadwal Masa Input KRS:*\n- Masa Pengisian: Awal semester (biasanya minggu pertama)\n- Masa Penyesuaian: Minggu kedua\n- Batas Akhir: Sebelum酶审核完成\n\n💡 Jangan lupa untukvalidasi KRS Anda!',
      quickReplies: [
        { label: '📅 Jadwal Perkuliahan', action: 'jadwal' },
        { label: '📊 Nilai & Transkrip', action: 'nilai' },
        { label: '🔙 Kembali', action: 'akademik' }
      ]
    },

    'kalender': {
      answer: '📅 *KALENDER AKADEMIK*\n\nBerikut adalah kegiatan akademik penting:\n\n🔹 *Awal Semester:*\n- Masa orientasi mahasiswa baru\n- Pengisian KRS\n- Awal perkuliahan\n\n🔹 *Pertengahan Semester:*\n- Midterm/UTS (Minggu ke-8)\n- Masa withdraw mata kuliah\n\n🔹 *Akhir Semester:*\n- Akhir perkuliahan\n- Ujian Akhir Semester (UAS)\n- Entry nilai\n\n🔹 *Libur:*\n- Libur semester gasal/genap\n- Libur nasional\n\n💡 Untuk tanggal pasti, cek langsung di SIAKAD/AIS menu "Kalender Akademik" atau website universitas.',
      quickReplies: [
        { label: '📝 Panduan KRS', action: 'krs' },
        { label: '📊 Nilai & Transkrip', action: 'nilai' },
        { label: '🔙 Kembali', action: 'akademik' }
      ]
    },

    'nilai': {
      answer: '📊 *NILAI & TRANSKRIP*\n\n📌 *Cara Melihat Nilai:*\n1. Login ke SIAKAD/AIS\n2. Pilih menu "Nilai Mahasiswa"\n3. Pilih semester\n4. Pilih mata kuliah\n5. Nilai akan ditampilkan\n\n📌 *Cara Melihat Transkrip:*\n1. Login ke SIAKAD/AIS\n2. Pilih menu "Transkrip Nilai"\n3. Transkrip lengkap akan ditampilkan\n4. Dapat diunduh/cetak\n\n📈 *Informasi IPK:*\n- IPK (Indeks Prestasi Kumulatif)\n- IP Semester per semester\n- Total SKS yang diambil\n- Predikat kelulusan\n\n💡 Nilai biasanya diupload 2-4 minggu setelah UAS.',
      quickReplies: [
        { label: '🎓 Skripsi & Yudisium', action: 'skripsi' },
        { label: '🔙 Kembali', action: 'akademik' }
      ]
    },

    'cuti': {
      answer: '🔄 *CUTI & AKTIF KULIAH*\n\n📌 *Syarat Mengajukan Cuti:*\n1. Minimal sudah kuliah 1 semester\n2. Tidak ada tanggungan administratif\n3. Mengisi formulir pengajuan cuti\n4. Persetujuan dosen Wali\n5. Tidak ada denda/bayar UKT tertunggak\n\n📌 *Cara Pengajuan Cuti:*\n1. Login ke SIAKAD/AIS\n2. Pilih menu "Pengajuan Cuti"\n3. Isi formulir online\n4. Upload dokumen pendukung\n5. Submit dan tunggu persetujuan\n\n📌 *Cara Aktif Kembali:*\n1. Ajukan aktif kuliah di SIAKAD\n2. Bayar UKT sesuai ketentuan\n3. Isi KRS seperti biasa\n\n⚠️ Perhatikan batas waktu pengajuan!',
      quickReplies: [
        { label: '📝 Panduan KRS', action: 'krs' },
        { label: '💰 Pembayaran UKT', action: 'ukt' },
        { label: '🔙 Kembali', action: 'akademik' }
      ]
    },

    // JALUR AKHIR
    'akhir': {
      answer: '🎓 *JALUR AKHIR (PKL, SKRIPSI, & KELULUSAN)*\n\nPilih subjek di bawah:',
      quickReplies: [
        { label: '💼 Informasi PKL/Magang', action: 'pkl' },
        { label: '📜 Informasi Skripsi', action: 'skripsi' },
        { label: '📂 Template & Format', action: 'template' },
        { label: '🎉 Yudisium & Wisuda', action: 'yudisium' },
        { label: '🔙 Kembali ke Menu', action: 'menu' }
      ]
    },

    'pkl': {
      answer: '💼 *INFORMASI PKL/MAGANG*\n\n📌 *Langkah-langkah Pengajuan:*\n1. Konsultasi dengan dosen pembimbing\n2. Pilih perusahaan/institusi mitra\n3. Ajukan surat pengantar via SIAKAD\n4. Submit proposal PKL\n5. Mulai masa magang\n\n🏢 *Daftar Perusahaan Mitra:*\n Cek di menu "PKL" - "Perusahaan Mitra" di SIAKAD\n\n📄 *Format Laporan PKL:*\n- Cover sesuai template\n- Pendahuluan\n- Pembahasan\n- Kesimpulan\n- Daftar Pustaka\n\n💡 Mulai cari PKL minimal 1 semester sebelum graduation!',
      quickReplies: [
        { label: '📂 Template & Format', action: 'template' },
        { label: '📜 Informasi Skripsi', action: 'skripsi' },
        { label: '🔙 Kembali', action: 'akhir' }
      ]
    },

    'skripsi': {
      answer: '📜 *INFORMASI SKRIPSI*\n\n📌 *Syarat Pendaftaran:*\n1. Selesai seluruh mata kuliah (except skripsi)\n2. Minimal IPK 2.75 (sesuai prodi)\n3. Lulus PKL\n4. Tidak ada tanggungan administratif\n5. Bukti publikasi jurnal (jika diminta)\n\n📌 *Alur Pengajuan Judul:*\n1. Submit judul via SIAKAD\n2. Pilih dosbim (dosen pembimbing)\n3. Sempro (Seminar Proposal)\n4. Revisi proposal\n5. Penelitian\n6. Sidang Skripsi\n\n👨‍🏫 *Daftar Dosen Pembimbing:*\n Cek di menu "Skripsi" - "Dosen Pembimbing" atau hubungi prodi.\n\n⚠️ Proses skripsi bisa memakan waktu 1-2 semester!',
      quickReplies: [
        { label: '📂 Template Skripsi', action: 'template' },
        { label: '🎉 Yudisium & Wisuda', action: 'yudisium' },
        { label: '🔙 Kembali', action: 'akhir' }
      ]
    },

    'template': {
      answer: '📂 *TEMPLATE & FORMAT*\n\nBerikut adalah link download otomatis:\n\n📄 *Proposal Skripsi:*\n- Format Word (.docx)\n- Format LaTeX\n- Template Cover\n\n📄 *Skripsi Akhir:*\n- Format Word (.docx)\n- Format LaTeX\n- Template Lembar Pengesahan\n- Template Abstrak\n\n📄 *Formulir Bimbingan:*\n- Formulir Persetujuan Dosbim\n- Formulir Lembar Konsultasi\n- Formulir Perubahan Judul\n\n📄 *PKL:*\n- Format Laporan PKL\n- Template Cover PKL\n- Form Penilaian PKL\n\n💡 Semua template tersedia di menu "Download" SIAKAD atau website prodi.',
      quickReplies: [
        { label: '📜 Informasi Skripsi', action: 'skripsi' },
        { label: '💼 Informasi PKL', action: 'pkl' },
        { label: '🔙 Kembali', action: 'akhir' }
      ]
    },

    'yudisium': {
      answer: '🎉 *YUDISIUM & WISUDA*\n\n📌 *Syarat Yudisium:*\n1. Selesai seluruh SKS termasuk skripsi\n2. IPK minimal sesuai ketentuan\n3. Tidak ada tanggungan:\n   - Perpustakaan\n   - Lab/Kimia\n   - Keuangan\n4. Upload skripsi final ke repositori\n5. Submit berkas lengkap\n\n📌 *Ceklis Berkas Yudisium:*\n✅ Transkrip nilai asli\n✅ Ijazah SMA/SMK\n✅ Foto verifikasi\n✅ Skripsi yang sudah disahkan\n✅ Bukti bebas tanggungan\n\n📅 *Jadwal Wisuda:*\n- Wisuda semester gasal: Oktober/November\n- Wisuda semester genap: April/Mei\n\n💡Submit berkas minimal 1 bulan sebelum wisuda!',
      quickReplies: [
        { label: '📜 Informasi Skripsi', action: 'skripsi' },
        { label: '💼 Informasi PKL', action: 'pkl' },
        { label: '🔙 Kembali', action: 'akhir' }
      ]
    },

    // LAYANAN MAHASISWA
    'layanan': {
      answer: '💼 *LAYANAN MAHASISWA*\n\nPilih subjek di bawah:',
      quickReplies: [
        { label: '🎓 Informasi Beasiswa', action: 'beasiswa' },
        { label: '📞 Kontak & Dukungan', action: 'kontak' },
        { label: '🗺️ Peta & Fasilitas', action: 'peta' },
        { label: '💳 Kartu Mahasiswa (KTM)', action: 'ktm' },
        { label: '🔙 Kembali ke Menu', action: 'menu' }
      ]
    },

    'beasiswa': {
      answer: '🎓 *INFORMASI BEASISWA*\n\n📌 *Beasiswa Internal:*\n- Beasiswa Prestasi Akademik\n- Beasiswa Tidak Mampu (KJP)\n- Beasiswa Karya Tugas Akhir\n\n📌 *Beasiswa Eksternal:*\n- Beasiswa LPDP\n- Beasiswa Perusahaan\n- Beasiswa Pemerintah Daerah\n\n📅 *Cara Pengajuan:*\n1. Cek pengumuman di SIAKAD/website\n2. Siapkan persyaratan\n3. Upload berkas melalui SIAKAD\n4. Ikuti seleksi\n\n💡 Info terbaru selalu di menu "Beasiswa" SIAKAD!',
      quickReplies: [
        { label: '📞 Kontak & Dukungan', action: 'kontak' },
        { label: '🔙 Kembali', action: 'layanan' }
      ]
    },

    'kontak': {
      answer: '📞 *KONTAK & DUKUNGAN*\n\n🏢 *Admin Prodi:*\n- Email: admin@prodi.ac.id\n- WhatsApp: 0812-xxxx-xxxx\n\n👨‍🏫 *Dosen Wali:*\n Cek di menu "Dosen Wali" di SIAKAD Anda\n\n🖥️ *Teknisi IT:*\n- Email: it@universitas.ac.id\n- Helpdesk: Gedung rektorat Lt. 1\n\n📋 *Hal yang bisa ditanyakan:*\n- Masalah login SIAKAD\n- Error sistem\n- Reset password\n- Masalah KRS\n\n⚠️ Untuk masalah mendesak, hubungi langsung via WhatsApp!',
      quickReplies: [
        { label: '🎓 Informasi Beasiswa', action: 'beasiswa' },
        { label: '❓ FAQ', action: 'faq' },
        { label: '🔙 Kembali', action: 'layanan' }
      ]
    },

    'peta': {
      answer: '🗺️ *PETA & FASILITAS*\n\n🏢 *Gedung:*\n- Gedung A: Gedung Administrasi\n- Gedung B: Ruang Kelas\n- Gedung C: Lab Komputer\n- Gedung D: Perpustakaan\n- Gedung E: Auditorium\n\n📚 *Layanan Perpustakaan:*\n- Peminjaman buku\n- Ruang baca\n- Akses jurnal digital\n\n🏃 *Fasilitas Lainnya:*\n- Aula/rapat (booking via SIAKAD)\n- Lab bahasa\n- Gym mahasiswa\n- Kantin\n\n💡 Untuk booking ruang, cek di menu "Fasilitas" SIAKAD!',
      quickReplies: [
        { label: '📚 Perpustakaan', action: 'perpustakaan' },
        { label: '📞 Kontak', action: 'kontak' },
        { label: '🔙 Kembali', action: 'layanan' }
      ]
    },

    'ktm': {
      answer: '💳 *KARTU MAHASISWA (KTM)*\n\n📌 *Jika KTM Hilang:*\n1. Buat laporan kehilangan polisi\n2. Login ke SIAKAD\n3. Pilih menu "Cetak KTM"\n4. Pilih "Pengantian KTM Hilang"\n5. Upload surat kehilangan\n6. Bayar biaya penggantian\n7. Ambil di Bagian Akademik\n\n📌 *Aktivasi KTM:*\n- Untuk akses perpustakaan\n- Untuk pembayaran\n- Untuk absensi kuliah\n\n💡 Simpan baik-baik! KTM berfungsi sebagai identitas resmi mahasiswa.',
      quickReplies: [
        { label: '📚 Perpustakaan', action: 'perpustakaan' },
        { label: '🔙 Kembali', action: 'layanan' }
      ]
    },

    'perpustakaan': {
      answer: '📚 *PERPUSTAKAAN*\n\n📌 *Layanan:*\n- Peminjaman buku\n- Akses e-journal\n- Ruang baca tenang\n- Akses WiFi\n- Print/Photocopy\n\n📅 *Jam Buka:*\n- Senin-Jumat: 08.00-20.00\n- Sabtu: 08.00-14.00\n\n🔑 *Cara Pinjam:*\n1. Datang ke perpustakaan\n2. Scan KTM\n3. Pilih buku\n4. Proses pinjam di counter\n\n⚠️ Jangan terlambat mengembalikan buku! Ada denda keterlambatan.',
      quickReplies: [
        { label: '💳 KTM', action: 'ktm' },
        { label: '🔙 Kembali', action: 'layanan' }
      ]
    },

    // FAQ
    'faq': {
      answer: '❓ *FAQ (TANYA JAWAB UMUM)*\n\nPilih pertanyaan yang sering ditanyakan:',
      quickReplies: [
        { label: '🔑 Lupa Password', action: 'password' },
        { label: '💳 KTM Hilang', action: 'ktm' },
        { label: '💰 Pembayaran UKT', action: 'ukt' },
        { label: '🔄 Cara Aktif Kuliah', action: 'cuti' },
        { label: '🔙 Kembali ke Menu', action: 'menu' }
      ]
    },

    'password': {
      answer: '🔑 *LUPA PASSWORD SIAKAD*\n\n📌 *Cara Reset Password:*\n1. Klik "Lupa Password" di halaman login\n2. Masukkan NIM dan email terdaftar\n3. Link reset akan dikirim ke email\n4. Klik link dan buat password baru\n\n📌 *Jika Email Tidak Tersedia:*\n- Datang langsung ke Bagian Akademik\n- Bawa KTM asli\n- Bantuarkan identitas\n\n💡 Setelah login, segera ubah password secara berkala!',
      quickReplies: [
        { label: '❓ FAQ Lain', action: 'faq' },
        { label: '📞 Hubungi Admin', action: 'kontak' },
        { label: '🔙 Kembali', action: 'menu' }
      ]
    },

    'ukt': {
      answer: '💰 *PEMBAYARAN UKT*\n\n📌 *Cara Pembayaran:*\n1. Login ke SIAKAD\n2. Pilih menu "Keuangan"\n3. Lihat tagihan UKT\n4. Simpan nomor virtual account\n5. Transfer via ATM/ibank/mobile banking\n6. Konfirmasi pembayaran\n\n📅 *Jadwal Pembayaran:*\n- Pembayaran UKT per semester\n- Batas akhir biasanya 2 minggu sebelum UAS\n\n⚠️ *Jika Terlambat:*\n- Denda keterlambatan\n- Tidak bisa isi KRS\n- Tidak bisa ujian\n\n💡 Simpan bukti pembayaran!',
      quickReplies: [
        { label: '📊 Nilai & Transkrip', action: 'nilai' },
        { label: '❓ FAQ Lain', action: 'faq' },
        { label: '🔙 Kembali', action: 'menu' }
      ]
    },

    'irs': {
      answer: '📊 *CARA MELIHAT IRS (Isian Rencana Studi)*\n\n📌 *Langkah-langkah:*\n1. Login ke SIAKAD/AIS\n2. Pilih menu "IRS"\n3. Pilih semester\n4. IRS akan ditampilkan dengan detail:\n   - Kode Mata Kuliah\n   - Nama Mata Kuliah\n   - SKS\n   - Jadwal\n   - Dosen Pengampu\n\n📌 *Penting:*\n- IRS harus disetujui dosbim\n- Setelah IRS disetujui, tidak bisa diubah\n- Jika ingin ubah, harus ajukan perubahan\n\n💡 Cetak IRS sebagai bukti!',
      quickReplies: [
        { label: '📝 Panduan KRS', action: 'krs' },
        { label: '📅 Jadwal Kuliah', action: 'jadwal' },
        { label: '🔙 Kembali', action: 'menu' }
      ]
    },

    // FALLBACK - TIDAK MENGETAHUI JAWABAN
    'fallback': {
      answer: 'Maaf, saya tidak mengerti pertanyaan Anda. 🙏\n\nSilakan pilih dari menu di bawah atau coba pertanyaan lain:',
      quickReplies: [
        { label: '📚 Administrasi & Akademik', action: 'akademik' },
        { label: '🎓 Jalur Akhir', action: 'akhir' },
        { label: '💼 Layanan Mahasiswa', action: 'layanan' },
        { label: '❓ FAQ', action: 'faq' },
        { label: '👤 Hubungi Admin', action: 'human' }
      ]
    },

    'human': {
      answer: '👤 *HUBUNGI ADMIN*\n\nMohon maaf, pertanyaan Anda memerlukan bantuan langsung dari admin.\n\n📞 *Cara Menghubungi:*\n- WhatsApp: 0812-xxxx-xxxx\n- Email: admin@campus.ac.id\n- Datang: Gedung Administrasi Lt. 1\n\n🕐 *Jam Layanan:*\n- Senin-Jumat: 08.00-16.00\n\n💡 Pastikan untuk menyertakan NIM dan screenshot error jika ada!',
      quickReplies: [
        { label: '🔙 Kembali ke Menu', action: 'menu' }
      ]
    }
  };

  getResponse(userMessage: string): { answer: string; quickReplies?: QuickReply[] } {
    const normalizedMessage = userMessage.toLowerCase().trim();
    
    // Check exact match first
    if (this.qaData[normalizedMessage]) {
      return this.qaData[normalizedMessage];
    }

    // Check keyword matching
    for (const [key, data] of Object.entries(this.qaData)) {
      if (normalizedMessage.includes(key) || key.includes(normalizedMessage)) {
        return data;
      }
    }

    // Check common variations
    const keywords: { [key: string]: string } = {
      'jadwal': 'jadwal',
      'krs': 'krs',
      'nilai': 'nilai',
      'transkrip': 'nilai',
      'ipk': 'nilai',
      'cuti': 'cuti',
      'aktif': 'cuti',
      'kalender': 'kalender',
      'kalender akademik': 'kalender',
      'pkl': 'pkl',
      'magang': 'pkl',
      'skripsi': 'skripsi',
      'ta': 'skripsi',
      'tugas akhir': 'skripsi',
      'yudisium': 'yudisium',
      'wisuda': 'yudisium',
      'beasiswa': 'beasiswa',
      'ukt': 'ukt',
      'pembayaran': 'ukt',
      'password': 'password',
      'login': 'password',
      'lupa': 'password',
      'ktm': 'ktm',
      'kartu mahasiswa': 'ktm',
      'kartu': 'ktm',
      'perpustakaan': 'perpustakaan',
      'buku': 'perpustakaan',
      'peta': 'peta',
      'fasilitas': 'peta',
      'gedung': 'peta',
      'kontak': 'kontak',
      'admin': 'kontak',
      'bantuan': 'kontak',
      'help': 'kontak',
      'akademik': 'akademik',
      'administrasi': 'akademik',
      'akhir': 'akhir',
      'lulus': 'yudisium',
      'template': 'template',
      'format': 'template',
      'faq': 'faq',
      'tanya': 'faq',
      'umum': 'faq',
    };

    for (const [keyword, action] of Object.entries(keywords)) {
      if (normalizedMessage.includes(keyword)) {
        return this.qaData[action];
      }
    }

    // Default fallback
    return this.qaData['fallback'];
  }

  getInitialMessage(): { answer: string; quickReplies?: QuickReply[] } {
    return this.qaData['menu'];
  }
}
