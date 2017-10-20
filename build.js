var markdownpdf = require("markdown-pdf")
  , fs = require("fs")

var options = {
    paperBorder: "1.4cm"
};

fs.createReadStream("README.md")
  .pipe(markdownpdf(options))
  .pipe(fs.createWriteStream("resume.pdf"))