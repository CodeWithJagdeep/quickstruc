const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const clc = require("cli-color");
const { spinner } = require("../../util/spinner");

async function installDependencies(appName, useTypeScript) {
  const dependencies = [
    "tailwindcss",
    "postcss",
    "autoprefixer",
    "redux",
    "react-redux",
    "react-router-dom",
    "web-vitals",
    "axios",
  ];

  const devDependencies = [
    "postcss",
    "tailwindcss",
    "eslint",
    "eslint-config-next",
  ];

  const typeDepended = [
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "@types/axios",
  ];

  console.log("\n");
  // Install regular dependencies
  console.log("Installing dependencies:");
  dependencies.forEach((dependency) =>
    console.log(clc.cyan(`\n - ${dependency}`))
  );
  console.log("\n");
  // Install dev dependencies
  console.log("\nInstalling devDependencies:");
  devDependencies.forEach((devDependency) =>
    console.log(clc.cyan(`\n - ${devDependency}`))
  );
  console.log("\n");
  if (useTypeScript) {
    dependencies.push(...typeDepended);
  }
  exec(
    `cd ${appName} && npm install ${dependencies.join(" ")}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("\n❌ Error installing dependencies:", error.message);
        process.exit(1);
      }

      exec(
        `cd ${appName} && npm install --save-dev ${devDependencies.join(" ")}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(
              "\n❌ Error installing dev dependencies:",
              error.message
            );
            process.exit(1);
          }

          configureTailwindCSS(appName, useTypeScript);
        }
      );
    }
  );
}

// Function to configure Tailwind CSS in the React project
function configureTailwindCSS(appName, useTypeScript) {
  // Create Tailwind configuration files
  exec(`cd ${appName} && npx tailwindcss init -p`, (error, stdout, stderr) => {
    if (error) {
      console.error("\n❌ Error configuring Tailwind CSS:", error.message);
      process.exit(1);
    }

    // Modify the content of tailwind.config.js and src/index.css
    const tailwindConfigPath = path.join(appName, "tailwind.config.js");
    const indexCssPath = path.join(appName, "src", "index.css");

    const tailwindConfig = `module.exports = {
      content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    };`;

    const indexCss = `@tailwind base;
        @tailwind components;
        @tailwind utilities;

        :root {
          --background: #ffffff;
          --foreground: #171717;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --background: #0a0a0a;
            --foreground: #ededed;
          }
        }

        body {
          color: var(--foreground);
          background: var(--background);
          font-family: Arial, Helvetica, sans-serif;
        }
  `;

    try {
      fs.writeFileSync(tailwindConfigPath, tailwindConfig, "utf-8");
      fs.writeFileSync(indexCssPath, indexCss, "utf-8");
    } catch (err) {
      console.error("\n❌ Error writing Tailwind CSS files:", err.message);
      process.exit(1);
    }

    //     // Optional: TypeScript Configuration for index.tsx (uncomment if needed)
    //     if (useTypeScript) {
    //       const indexTsxPath = path.join(appName, "src", "index.tsx");
    //       const indexTsxContent = `import React from "react";
    // import ReactDOM from "react-dom/client";
    // import "./index.css";
    // import App from "./App";
    // import reportWebVitals from "./reportWebVitals";
    // import { Provider } from "react-redux";
    // import { createStore, Store } from "redux";
    // import { _reducer, initialState } from "./container/reducers/reducer";
    // import { compose } from "redux";

    // // Ensure 'root' is of type HTMLElement
    // const root = ReactDOM.createRoot(
    //   document.getElementById("root") as HTMLElement
    // );

    // // Create a store with proper type annotations
    // const store: Store = createStore(_reducer, initialState);

    // // Render the app within the Redux Provider
    // root.render(
    //   <React.StrictMode>
    //     <Provider store={store}>
    //       <App />
    //     </Provider>
    //   </React.StrictMode>
    // );

    // // Optionally measure performance in the app
    // reportWebVitals();
    // `;

    // try {
    //   fs.writeFileSync(indexTsxPath, indexTsxContent, "utf-8");
    //   console.log(chalk.green("\n✅ TypeScript configuration completed!"));
    // } catch (err) {
    //   console.error(
    //     chalk.red("\n❌ Error writing index.tsx file:", err.message)
    //   );
    //   process.exit(1);
    // }
    // }
  });
}

module.exports = { installDependencies };
