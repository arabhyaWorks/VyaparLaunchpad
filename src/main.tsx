import 'regenerator-runtime/runtime';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
// import App from './Tap'
import { store } from "./redux/store";
import { AppProvider } from "./AppContext";
import "./index.css";

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