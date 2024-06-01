const fs = require("fs");
const path = require("path");

const files = ["parking_lot"];

files.forEach((file) => {
  const filePath = path.join(__dirname, file);
  try {
    fs.chmodSync(filePath, "755");
    console.log(`Set executable permissions for ${file}`);
  } catch (error) {
    console.error(`Error setting executable permissions for ${file}:`, error);
  }
});
