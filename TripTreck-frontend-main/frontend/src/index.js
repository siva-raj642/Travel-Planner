import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Ensure this line is present and points to the correct file
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
