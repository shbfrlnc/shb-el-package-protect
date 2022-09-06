// script ini berfungsi sebagai bootstrapper
// karena kita bisa menggunakan dua jenis script
// yakni yang obfuscated (ada di folder srcc)
// maupun yang plaintext (ada di folder src).

// jika panjang argument command line >= 3...
if (process.argv.length >= 3) {
    // jika argument ke 2 nya adalah --debug...
    if (process.argv[2] == "--debug") {
        // maka jalankan app.js yang plaintext.
        require("./src/app.js");
    } else {
        // maka jalankan app.js yang obfuscated.
        require("./srcc/app.js");
    }
} else {
    // jika argument command line selain itu
    // maka jalankan app.js yang obfuscated.
    require("./srcc/app.js");
}