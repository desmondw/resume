var fs = require("fs")
var through2 = require('through2');
var markdownPdf = require("markdown-pdf")
var removeMarkdown = require("remove-markdown")

var resume = fs.createReadStream("README.md")
var pdf = fs.createWriteStream("Resume - Desmond Weindorf.pdf")
var txt = fs.createWriteStream("Resume - Desmond Weindorf.txt")
var md = fs.createWriteStream("Resume - Desmond Weindorf.md")

process.stdout.write('Building other file types...\n')

// pdf
resume.pipe(markdownPdf({ paperBorder: "1.4cm" })).pipe(pdf)

// txt
resume.pipe(through2(function(line, _, next) {
    this.push(removeMarkdown(line.toString()) + '\n');
    next()
})).pipe(txt)

// md
resume.pipe(md)
