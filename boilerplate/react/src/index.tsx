import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import reportWebVitals from "./reportWebVitals.ts";
import { Provider } from "react-redux";
import { createStore, Store } from "redux";
import { _reducer, initialState } from "./containers/reducers/reducer.ts";

// Ensure 'root' is of type HTMLElement
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Check your HTML structure.");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

// Create a Redux store
const store: Store = createStore(
  _reducer,
  initialState,
  // Add Redux DevTools extension support
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// Render the app within the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* Pass children as required */}
      <App />
    </Provider>
  </React.StrictMode>
);

// Optionally measure performance in the app
reportWebVitals();
