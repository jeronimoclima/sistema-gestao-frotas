import React from "react";
import ReactDOM from "react-dom/client";
import { AppRoutes } from "./routes";
//import "./index.css"; // CSS global base
//import "./components/layout/Layout.css"; // 👈 SEU LAYOUT

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);



