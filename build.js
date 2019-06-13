var fs = require("fs");
var through2 = require('through2');
var markdownPdf = require("markdown-pdf");
var sync = require("sync");

var resume = fs.createReadStream("README.md");
var pdf = fs.createWriteStream("Resume - Desmond Weindorf.pdf");
var txt = fs.createWriteStream("Resume - Desmond Weindorf.txt");
var md = fs.createWriteStream("Resume - Desmond Weindorf.md");

process.stdout.write('Building other file types...\n');

sync(function(){
  // pdf
  resume.pipe(markdownPdf()).pipe(pdf);

  // txt
  resume.pipe(through2(function(chunk, _, next) {
    chunk = chunk.toString();

    // subhheader
    chunk = chunk.replace(/\s*\n## /g, '\n\n-------------\n\n');

    // remove other headers, bold
    chunk = chunk.replace(/^#* /, '');
    chunk = chunk.replace(/\n#* /g, '\n');
    chunk = chunk.replace(/([^\n]*)__(.*)__([^\n]*)/g, '$1$2$3');

    this.push(chunk);
    next();
  })).pipe(txt);

  // md
  resume.pipe(md);
});
