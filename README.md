# Birthday Blue Scrapbook

Salinan lokal dari tampilan publik yang dipilih:
https://glosdigital.my.canva.site/happy-birthday

Komposisi halaman, gambar, font, dan animasi dipertahankan dari ekspor publik referensi. Ini adalah website hasil publikasi, bukan proyek Canva yang bisa dibuka di editor Canva.

## Menjalankan

1. Pasang Node.js 22 atau lebih baru.
2. Buka terminal di folder ini.
3. Jalankan `npm start`.
4. Buka http://127.0.0.1:4173/happy-birthday.

Tidak perlu memasang paket tambahan.

## Isi

- `dist/index.html`: halaman serta data tata letak.
- `dist/_assets/`: gambar, font, stylesheet, dan mesin animasi.
- `server.mjs`: server lokal dengan dukungan tautan antarhalaman.

Menu yang tersedia: Happy Birthday, Our Song, My Favorite Moments, Birthday Coupons, dan A Letter For You. Pemutar YouTube memerlukan koneksi internet; ketersediaannya mengikuti YouTube.

## Personalisasi

- Latar kertas biru pucat dan krem, dengan tulisan biru gelap.
- Huruf kolase `My Girl` menggantikan `My Boy`.
- Kurva animasi diperhalus tanpa mengubah sinkronisasi tata letak.
- Musik latar: https://www.youtube.com/watch?v=iOQEJUw2NlE&t=28s. Dimulai pada detik 28 setelah interaksi pertama, dengan tombol nyala/mati dan pemutar yang dapat ditampilkan.
- Our Song: https://www.youtube.com/watch?v=gN79oyvYE-Q&t=60s. Dimulai pada detik 60. Jika YouTube tidak mengizinkan pemutaran tertanam, tombol tautan langsung tetap tersedia.
- Musik latar dijeda selama Our Song diputar.
- Ucapan pembuka: Happy Birthday sayangg.
- Surat personal lengkap, tanda tangan Junaa, dan dua foto pasangan ditampilkan melalui `dist/letter-content.js` serta `dist/letter-content.css`.
- Penyesuaian perilaku dan warna berada pada `dist/personalization.js` serta `dist/personalization.css`.

Desain dan materi contoh berasal dari demo GlosDigital. Atribusi ini dipertahankan untuk mencatat sumber referensi. Berkas ini tidak menyatakan kepemilikan atas desain maupun materi contoh tersebut.
