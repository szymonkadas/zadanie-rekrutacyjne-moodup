import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import "./index.module.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthContextProvider>
  </React.StrictMode>
);
