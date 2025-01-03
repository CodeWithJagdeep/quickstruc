import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, Store } from "redux";
import { _reducer, initialState } from "./containers/reducers/reducer";
import { compose } from "redux";

// Ensure 'root' is of type HTMLElement
const root = ReactDOM.createRoot(document.getElementById("root"));

// Create a store with proper type annotations
const store = createStore(_reducer, initialState);

// Render the app within the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Optionally measure performance in the app
reportWebVitals();
