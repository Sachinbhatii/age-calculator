import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Register web component
import "./custom-elements/age-info";

// PWA support (if using CRA or Vite, use their service worker registration)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js").catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);