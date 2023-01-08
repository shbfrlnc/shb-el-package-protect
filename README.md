# shb-el-package-protect - Cara Mempackage dan Memproteksi Aplikasi Electron

## Link-Link Penting

- TUTORIAL DAN SOFTWARE GRATIS: https://shbfrlnc.github.io/
- BLOG: https://shbfrlnc.github.io/tags/blog/
- PENGUMUMAN: https://shbfrlnc.github.io/tags/pengumuman/
- DUKUNG: https://shbfrlnc.github.io/dukung.html

## Software Apakah Ini?

shb-el-package-protect adalah source code yang menunjukkan cara mempackage dan memproteksi aplikasi Electron.

## Cara Mencoba Kode Ini

Untuk mencoba kode ini, masuk ke dalam folder ini via terminal.

Selanjutnya, jalankan:

```
npm install
```

 Selanjutnya, jalankan:

```
// untuk menjalankan kode versi plaintext
npm run dev
```

Atau obfuscate dahulu:

```
npm run compile
```

Kemudian, jalankan:

```
// untuk menjalankan kode versi obfuscated
npm start 
```

Dan untuk mem-build-nya menjadi installer:

```
npm run dist 
```

## Pendahuluan

Topik yang saya bahas kali ini adalah cara mempackage dan memproteksi kode aplikasi Electron.

Secara default, electron bisa menjalankan kode tanpa di-obfuscate.

Akan tetapi, merilis aplikasi Electron dengan kodenya yang masih belum di-obfuscate terlalu beresiko jika aplikasi tersebut bukan open source.

Walaupun begitu, ada metode kompresi script Electron yang bisa mem-bundle script Electron dalam bentuk file asar.

Sayangnya, kode yang dikompresi dengan cara tersebut dapat dengan mudah diekstrak dan dilihat bentuk aslinya.

## Cara Kerja

Dalam mem-obfuscate kode Electron, ada beberapa poin yang dilakukan:

1. Menulis kode aslinya (semua script yang ditulis di dalam folder src, lihat kodenya di repository saya).
2. Membuat starter (main.js).
3. Membuat obfuscator (compile.js).
4. Meng-copy kode asli ke folder terpisah dengan struktur yang sama dengan kode aslinya.
5. Melakukan obfuscate pada sebagian atau seluruh kode di poin 1.

Yang perlu Anda ketahui tentang starter di poin 2 adalah, bahwa kode starter tersebut bisa menjalankan kode yang sudah di-obfuscate dan yang belumnya.

Walaupun begitu, ketika aplikasi Electron dibuat installernya, hanya kode yang ter-obfuscate saja yang disertakan.

Lalu mengapa kode starter dirancang untuk menjalankan kode yang belum di-obfuscate juga?

Jawabannya adalah karena selama development, kemungkinan akan ada banyak perubahan di kode aslinya sehingga masih perlu dicoba dijalankan dalam bentuk asli.

Selain itu, dalam contoh di artikel ini, tidak semua kode di-obfuscate.

HTML, CSS, JSON, dan script yang ada di dalam node_modules dalam artikel ini, tidak di-obfuscate.

Jadi, ketika kode asli dianggap selesai, kita hanya perlu menjalankan perintah compile, kemudian dilanjutkan dengan mem-build installernya.

## Struktur Project

Struktur project aplikasi ini terdiri dari banyak jenis file, namun hanya beberapa saja yang perlu kita perhatikan.

### File obufscate.js

- File ini adalah script yang bertugas untuk meng-obfuscate script di dalam folder src yang masih plaintext.

### File main.js

- File ini adalah script bootstrapper yang memilih apakah script plaintext atau obfuscated yang dijalankan, tergantung argumen dari command line yang diberikan.