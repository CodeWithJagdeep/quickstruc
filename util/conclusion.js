// Function to show the folder structure
function showFolderStructure(answer) {
  console.log("\nProject folder structure:");
  let nodeStructure = `
    ${answer.appName}/
    ├── node_modules/               # Installed dependencies
    ├── public/                     # Public files (images, logos, etc.)
    ├── config/                     # Configuration files (e.g., env.js, DB config)
    │   ├── env.js                  # Environment-specific variables
    ├── controllers/                # Controllers to handle route logic
    │   ├── AuthController.js       # Authentication controller
    ├── logging/                    # Logs (e.g., app.log)
    ├── middlewares/                # Middlewares (e.g., JWT, CORS, rate limiter)
    │   ├── authMiddleware.js       # JWT token validation middleware
    │   ├── corsMiddleware.js       # CORS handling middleware
    │   ├── globalErrorHandler.js  # Global error handler middleware
    │   └── rateLimiter.js         # Rate limiter middleware
    ├── models/                     # Models (e.g., User.js)
    ├── routes/                     # API route definitions
    │   ├── AuthRouter.js           # Authentication routes
    ├── services/                   # Service logic (e.g., EmailServices.js, JwtServices.js)
    │   ├── EmailServices.js        # Email-related services
    │   ├── JwtServices.js          # JWT-related services
    ├── utils/                      # Utility functions (e.g., logger, AppError)
    │   ├── logger.js               # Logger utility (Winston)
    │   └── AppError.js             # Custom error handler utility
    ├── views/                      # View templates (empty for now)
    ├── .gitignore                  # Git ignore file
    ├── .env                        # Environment variables for production, development
    ├── Dockerfile                  # Dockerfile for building the Docker image
    ├── docker-compose.yml          # Docker Compose file for multi-container setups
    ├── package.json                # Project dependencies and scripts
    ${
      answer.useTypeScript &&
      "├── server.js                   # Entry point for the application"
    }
    ├── tsconfig.json               # TypeScript configuration file
    ├── README.md                   # Project description and setup instructions
    ${
      answer.useTypeScript &&
      `├── ts/                         
    │   ├── index.ts                # Main TypeScript entry point
    │   └── types/                  # Custom types (e.g., interfaces, enums)
    ├── dist/                       # Transpiled JavaScript files (output folder for TypeScript)`
    }
  `;

  const reactStructure = `
    ${answer.appName}/
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

  if (answer.framework === "React") {
    console.log(reactStructure);
  } else {
    console.log(nodeStructure);
  }
  console.log("\nInstructions on how to run the project:");
  console.log("Open your terminal/command prompt.");
  console.log("");
  console.log("Navigate to your project folder:");
  console.log(`\n cd ${answer.appName}`);
  console.log("");
  console.log("Start the development server:");
  console.log("Open your browser and go to http://localhost:3000");
  console.log("\n");

  console.log("✅ Happy Coding");
}

module.exports = { showFolderStructure };
