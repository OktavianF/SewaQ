# 📦 SewaQ – Platform Sewa-Menyewa Barang

**SewaQ** adalah web app marketplace untuk menyewa dan menyewakan berbagai jenis barang (iPhone, alat hiking, kamera, dll) yang sementara ini difokuskan untuk lingkungan lokal dengan radius maksimum 10 km dan sistem pembayaran *Cash on Delivery* (COD). Proyek ini dikembangkan untuk mengikuti lomba **GEMASTIK XVIII Divisi Pengembangan Perangkat Lunak** tahun 2025.

---

## 🌟 Fitur Utama

- 🌍 Peta Interaktif (Leaflet.js) dengan filter radius 10 km
- 🛒 Booking barang tanpa pembayaran online (COD)
- 👤 Dua peran pengguna: Pemberi Sewa & Penyewa
- 📆 Manajemen ketersediaan barang (kalender)
- 📍 Deteksi lokasi otomatis (Geolocation API)
- 🔐 Autentikasi user (JWT)
- 📁 Upload & kelola barang sewaan
- ⭐ Sistem rating & review antar pengguna

---

## 🚀 Tech Stack

### Frontend
- ⚛️ React.js + Vite
- 💨 Tailwind CSS
- 🗺️ Leaflet.js
- 🌐 React Router DOM

### Backend
- 🟩 Node.js + Express.js
- 🔐 JWT Auth + Bcrypt
- 📦 Multer (image upload)

### Database
- 🐘 PostgreSQL
- 🔄 Prisma ORM

### Lainnya
- ☁️ Cloudinary (image storage)
- 📍 OpenStreetMap Tiles (peta)
- 🌍 Vercel (hosting frontend)
- 🛠️ Railway / Render (hosting backend)

---

## 🧭 Alur Pengguna

1. **Penyewa** membuka aplikasi dan login
2. Lokasi pengguna diambil otomatis
3. Barang-barang terdekat (< 10 km) ditampilkan di peta
4. Penyewa bisa filter dan melihat detail barang
5. Penyewa melakukan booking tanpa pembayaran online
6. Pemberi sewa menerima notifikasi & menindaklanjuti booking
7. Transaksi dilakukan saat bertemu langsung (COD)
8. Kedua pihak dapat saling memberi review

---

## 🗂️ Struktur Folder

```bash
SewaQ/
├── |src/                 # Frontend (React + Vite)
│   │── components/
│   │── pages/
│   │── hooks/
│   └── App.tsx
│   
├── server/               # Backend (Node.js)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── index.js
├── prisma/               # Prisma schema & migrations
├── README.md
└── package.json
