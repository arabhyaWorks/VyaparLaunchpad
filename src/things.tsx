import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./css/style.css";
import "./css/satoshi.css";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { store } from "./redux/store";
import { AppProvider } from "./AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </Provider>
  </React.StrictMode>
);
