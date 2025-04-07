# Sistem Bank Sampah dengan Poin Digital

Aplikasi ini adalah sistem manajemen Bank Sampah dengan Poin Digital yang memungkinkan warga untuk menyetorkan sampah dan mendapatkan poin yang dapat ditukarkan dengan berbagai hadiah atau layanan.

## Fitur Utama

### Untuk Nasabah (Warga)
- Pendaftaran dan manajemen profil
- Melihat saldo poin
- Riwayat transaksi penyetoran sampah
- Riwayat penukaran poin
- Katalog hadiah yang dapat ditukarkan dengan poin
- Informasi harga sampah per kilogram

### Untuk Petugas Bank Sampah
- Manajemen nasabah
- Pencatatan setoran sampah
- Perhitungan poin otomatis
- Manajemen stok sampah

### Untuk Admin
- Dashboard dengan ringkasan data
- Manajemen pengguna (nasabah, petugas, mitra)
- Manajemen harga sampah
- Manajemen hadiah untuk penukaran poin
- Laporan dan analitik

### Untuk Mitra Penukaran
- Verifikasi nasabah dan saldo poin
- Proses transaksi penukaran
- Riwayat transaksi penukaran

## Teknologi yang Digunakan

- **Backend**: Node.js, Express.js
- **Database**: MySQL dengan Sequelize ORM
- **Autentikasi**: JWT (JSON Web Token)

## Cara Menjalankan Aplikasi

### Prasyarat
- Node.js (versi 14 atau lebih tinggi)
- MySQL

### Langkah-langkah Instalasi

1. Clone repositori ini

2. Instal dependensi
   ```
   npm install
   ```
3. cd to frontend folder
   ```
   NPM install node
   ```
3. Buat database MySQL dengan nama `bank_sampah_digital`

4. Konfigurasi file `.env` dengan kredensial database Anda

5. Jalankan aplikasi
   ```
   npm start
   ```

## Struktur Database

Sistem ini menggunakan beberapa model utama:

- **User**: Menyimpan data pengguna (nasabah, petugas, admin, mitra)
- **WasteType**: Jenis-jenis sampah yang diterima beserta nilai poinnya
- **Transaction**: Transaksi penyetoran sampah
- **TransactionDetail**: Detail sampah yang disetorkan dalam setiap transaksi
- **Reward**: Hadiah yang dapat ditukarkan dengan poin
- **RewardTransaction**: Transaksi penukaran poin dengan hadiah

## API Endpoints

### Autentikasi
- `POST /api/auth/register`: Pendaftaran pengguna baru
- `POST /api/auth/login`: Login pengguna
- `GET /api/auth/me`: Mendapatkan data pengguna yang sedang login
- `POST /api/auth/change-password`: Mengubah password

### Pengguna
- `GET /api/users`: Mendapatkan semua pengguna (admin only)
- `GET /api/users/:id`: Mendapatkan pengguna berdasarkan ID
- `POST /api/users`: Membuat pengguna baru (admin only)
- `PUT /api/users/:id`: Mengupdate data pengguna
- `DELETE /api/users/:id`: Menghapus pengguna (admin only)

### Jenis Sampah
- `GET /api/waste`: Mendapatkan semua jenis sampah
- `GET /api/waste/:id`: Mendapatkan jenis sampah berdasarkan ID
- `POST /api/waste`: Membuat jenis sampah baru (admin only)
- `PUT /api/waste/:id`: Mengupdate jenis sampah (admin only)
- `DELETE /api/waste/:id`: Menghapus jenis sampah (admin only)

### Transaksi Sampah
- `GET /api/transactions`: Mendapatkan semua transaksi
- `GET /api/transactions/:id`: Mendapatkan transaksi berdasarkan ID
- `POST /api/transactions`: Membuat transaksi baru
- `PUT /api/transactions/:id/status`: Mengupdate status transaksi

### Hadiah
- `GET /api/rewards`: Mendapatkan semua hadiah
- `GET /api/rewards/:id`: Mendapatkan hadiah berdasarkan ID
- `POST /api/rewards`: Membuat hadiah baru (admin only)
- `PUT /api/rewards/:id`: Mengupdate hadiah (admin only)
- `DELETE /api/rewards/:id`: Menghapus hadiah (admin only)

### Transaksi Penukaran Hadiah
- `GET /api/rewards/transactions`: Mendapatkan semua transaksi penukaran
- `GET /api/rewards/transactions/:id`: Mendapatkan transaksi penukaran berdasarkan ID
- `POST /api/rewards/transactions`: Membuat transaksi penukaran baru
- `PUT /api/rewards/transactions/:id/status`: Mengupdate status transaksi penukaran

## Pengembangan Selanjutnya

- Implementasi frontend dengan React.js atau Vue.js
- Integrasi dengan timbangan digital
- Implementasi QR Code untuk identifikasi nasabah
- Aplikasi mobile untuk nasabah
- Fitur edukasi tentang pemilahan sampah
