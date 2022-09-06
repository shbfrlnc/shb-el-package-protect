// script ini berfungsi untuk meng-obfuscate script-script
// yang ada dalam folder src ke dalam folder srcc.

// begin: import modules.
const JavaScriptObfuscator = require('javascript-obfuscator');
const copydir = require('copy-dir');
const fs = require('fs')

// end: import modules.

// copy seluruh isi folder src ke dalam folder srcc.
copydir.sync('./src', './srcc', {
    utimes: true,
    mode: true,
    cover: true
});

// untuk meng-obfuscate script-script yang ada di dalam folder srcc.
function walkDirRecursive(pathInput) {
    // baca seluruh isi folder.
    let dir = fs.opendirSync(pathInput)
    let val = dir.readSync()

    // selama masih ada...
    while (val) {
        // jika nama foldernya mengandung kata "vendor"...
        if ((pathInput + '/' + val.name).includes('vendor')) {
            // maka skip.
            console.log("SKIPPED: " + pathInput + '/' + val.name);
        } else {
            // jika nama file nya memiliki ekstensi ".js"...
            if (val.name.includes('.js')) {
                // maka proses.

                console.log("INCLUDED: " + pathInput + '/' + val.name);

                // baca file nya.
                let scriptContent = fs.readFileSync(pathInput + '/' + val.name, 'utf8');

                // kemudian obfuscate.
                let obfuscationResult = JavaScriptObfuscator.obfuscate(scriptContent, {
                    compact: false,
                    controlFlowFlattening: true
                });

                // ini hasil obfuscate nya.
                let protectedScriptContent = obfuscationResult.getObfuscatedCode();

                // rewrite.
                fs.writeFileSync(pathInput + '/' + val.name, protectedScriptContent);
            }
        }

        // jika folder...
        if (val.isDirectory()) {
            // maka panggil secara recursive fungsi ini.
            walkDirRecursive(pathInput + '/' + val.name);
        }

        val = dir.readSync();
    }
}

// obfuscate script-script yang ada di dalam folder srcc.
walkDirRecursive('./srcc');

