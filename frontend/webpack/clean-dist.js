const fs = require("fs");
const path = require("path");

const cleanDirectory = (dirPath) => {
  // Check if folder exists
  if (fs.existsSync(dirPath)) {
    // Read all files in the directory
    const files = fs.readdirSync(dirPath);

    // Delete each bundle file
    files.forEach((file) => {
      if (
        file.endsWith(".bundle.js") ||
        file.endsWith(".bundle.js.map") ||
        file.endsWith(".LICENSE.txt") ||
        file.endsWith(".css") ||
        file.endsWith(".css.map")
      ) {
        const filePath = path.join(dirPath, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${file}`);
      }
    });

    console.log(`${dirPath} folder cleaned`);
  } else {
    console.log(`${dirPath} folder does not exist`);
    // Create the folder
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created ${dirPath} folder`);
  }
};

// Clean both js and css directories
const jsPath = path.join(__dirname, "../dist/js");
const cssPath = path.join(__dirname, "../dist/css");

cleanDirectory(jsPath);
cleanDirectory(cssPath);
