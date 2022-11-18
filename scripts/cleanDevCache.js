const fs = require("fs");
const path = require("path");

/* This script will remove all files that ends with _cache.json inside the data folder */
const deleteCacheFiles = () => {
  try {
    const dataPath = path.join(process.cwd(), "data");
    const files = fs.readdirSync(dataPath);
    files.forEach(file => {
      if (file.endsWith("_cache.json")) {
        fs.unlinkSync(path.join(dataPath, file));
      }
    });
    console.log("Cache files deleted");
  } catch (e) {
    console.log(
      "------------ CLEAN DEV CACHE FILE ---------, error locating data folder/file"
    );
  }
};

deleteCacheFiles();
