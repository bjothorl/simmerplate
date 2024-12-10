const fs = require("fs");
const path = require("path");

const mode = process.argv[2]; // 'dev' or 'prod'

// Read layout file
const rootPath = path.join(__dirname, "../dist/index.html");
let rootHtml = fs.readFileSync(rootPath, "utf8");

// Determine bundle names based on mode
const jsBundleName =
  mode === "dev"
    ? "app.bundle.js"
    : fs
        .readdirSync(path.join(__dirname, "../dist/js"))
        .find((file) => file.match(/app\.[a-f0-9]+\.bundle\.js/));

const cssBundleName =
  mode === "dev"
    ? "app.css"
    : fs
        .readdirSync(path.join(__dirname, "../dist/css"))
        .find((file) => file.match(/app\.[a-f0-9]+\.css/));

// Replace bundle references in HTML
rootHtml = rootHtml
  .replace(
    /<script src=".\/js\/app\..*?bundle\.js"><\/script>/,
    `<script src="./js/${jsBundleName}"></script>`
  )
  .replace(
    /<link rel="stylesheet" href=".\/css\/app\..*?css">/,
    `<link rel="stylesheet" href="./css/${cssBundleName}">`
  );

console.log(`root html updated to use ${jsBundleName} and ${cssBundleName}`);

// Write back to layout
fs.writeFileSync(rootPath, rootHtml);
