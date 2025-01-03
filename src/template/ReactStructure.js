const reactStructure = {
  src: {
    assets: {
      images: [],
      logos: ["logo.png"],
      fonts: [],
      documents: [],
      audio: [],
      video: [],
    },
    components: {
      // Shared UI components
      common: {
        // Common components that can be reused throughout the app
        Button: ["Button.js"], // Button component (e.g., PrimaryButton, SecondaryButton)
        Input: ["Input.js"], // Input component (e.g., TextInput, Textarea)
      },
      specific: { Header: ["Header.js"] },
    },
    containers: {
      // Stateful containers responsible for handling logic and connecting components to Redux
      store: ["store.js"], // Store-related files (actions, reducers, middleware)
      reducers: ["reducer.js"],
      selectors: [
        // Selectors for selecting data from Redux state
        "selectors.js",
      ],
    },
    hooks: [],
    layouts: [
      // Layouts for defining page-wide structures
      "MainLayout.js",
    ],
    pages: {
      // Specific pages for the app
      Home: [
        // Components specific to the Home page
        "Home.js",
      ],
      About: [
        // Components specific to the About page
        "About.js",
      ],
      ContactUs: [
        // Components specific to the Contact Us page
        "Contact.js",
      ],
      Auth: {
        Login: [
          // Components specific to the Login page
          "Login.js",
        ],
      },
    },
    Routers: ["Links.js", "Routes.js"],
    services: [
      // API calls and other external services
      "AuthService.js",
    ],
    styles: {
      // Global and component-specific styles
      global: ["global.scss"], // Global styles (e.g., theme, global.scss)
      components: [
        // Component-specific styles
        "Button.scss",
        "Input.scss",
      ],
    },
    utils: ["validationUtils.js"],
    root: ["App.js", "index.js"],
  },
};

module.exports = { reactStructure };
