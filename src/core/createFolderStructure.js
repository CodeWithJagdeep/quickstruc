const fs = require("fs");
const path = require("path");

function createFolderStructure(
  basePath,
  structure,
  existedPath,
  useTypeScript
) {
  if (structure) {
    Object.keys(structure).forEach((key) => {
      const currentPath = path.join(basePath, key);
      const existedFilePath = path.join(existedPath, key);
      // Handle special files like App.js and index.js
      if (key === "App.js" || key === "index.js") {
        const fileExtension = useTypeScript ? ".tsx" : ".js";
        const filePath = path.join(basePath, key.replace(".js", fileExtension));
        const sourceFilePath = path.join(
          existedPath,
          key.replace(".js", fileExtension)
        );
        if (!fs.existsSync(filePath)) {
          ensureParentDirectoryExists(filePath);
          fs.copyFileSync(sourceFilePath, filePath);
        } else {
          const newFileName = `old_${Date.now()}_${key}`;
          const newFilePath = path.join(path.dirname(filePath), newFileName); // Correct directory path
          fs.renameSync(filePath, newFilePath);
          fs.copyFileSync(sourceFilePath, filePath); // Copy the original file again
        }
      } else {
        // Handle directories and files
        if (Array.isArray(structure[key])) {
          // If it's an array, it indicates files to be created in the current folder.
          ensureParentDirectoryExists(currentPath);

          structure[key].forEach((file) => {
            let fileExtension;

            if (
              file === "Routes.js" ||
              currentPath.includes("pages") ||
              currentPath.includes("components")
            ) {
              fileExtension = useTypeScript ? ".tsx" : ".jsx";
            } else {
              fileExtension = useTypeScript ? ".ts" : ".js";
            }

            // const fileExtension = useTypeScript ? ".ts" : ".js";
            const filePath = path.join(
              currentPath,
              file.replace(".js", fileExtension)
            );
            const existedFile = path.join(
              existedFilePath,
              file.replace(".js", fileExtension)
            );

            // Copy file if it does not exist, otherwise rename the existing one
            if (!fs.existsSync(filePath)) {
              ensureParentDirectoryExists(filePath);
              fs.copyFileSync(existedFile, filePath);
              console.log(`Copied file: ${filePath}`);
            } else {
              const newFileName = `old_${Date.now()}_${file}`;
              const newFilePath = path.join(currentPath, newFileName);
              fs.renameSync(filePath, newFilePath);
              fs.copyFileSync(existedFile, filePath);
              console.log(`File already existed. Renamed to: ${newFilePath}`);
            }
          });
        } else if (typeof structure[key] === "object") {
          // Recursively create folders and files
          ensureParentDirectoryExists(currentPath);
          createFolderStructure(
            currentPath,
            structure[key],
            existedFilePath,
            useTypeScript
          );
        }
      }
    });
  }
}

// Utility function to ensure parent directories exist before file operations
function ensureParentDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

module.exports = { createFolderStructure };
