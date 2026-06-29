import React from "react";
import ReactDOM from "react-dom/client";
import Page from "./page";
import "./style.css";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
);
