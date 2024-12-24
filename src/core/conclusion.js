// Function to show the folder structure
function showFolderStructure(appName) {
  console.log("\nProject folder structure:");

  const folderStructure = `
    ${appName}/
    ├── node_modules/               # Installed dependencies
    ├── public/                     # Public files (index.html, etc.)
    ├── src/                        # Source code for React
    │   ├── assets/                 # Images, logos, videos, etc.
    │   ├── components/             # React components
    │   ├── container/              # Redux reducers, store, etc.
    │   ├── hooks/                  # Custom React hooks
    │   ├── service/                # API service methods
    │   ├── utils/                  # Utility functions
    │   ├── App.js                  # Main React component
    │   ├── index.css               # Tailwind CSS file
    │   └── index.tsx               # Main entry point for TypeScript users
    ├── .gitignore                  # Git ignore file
    ├── package.json                # Project dependencies and scripts
    ├── tailwind.config.js          # Tailwind CSS configuration
    ├── postcss.config.js           # PostCSS configuration
    └── README.md                   # Project description and setup instructions
    `;

  console.log(folderStructure);
  console.log("\nInstructions on how to run the project:");
  console.log("Open your terminal/command prompt.");
  console.log("");
  console.log("Navigate to your project folder:");
  console.log(`\n cd ${appName}`);
  console.log("Start the development server:");
  console.log("Open your browser and go to http://localhost:3000");
  console.log("\n");

  console.log("✅ Happy Coding");
}

module.exports = { showFolderStructure };
