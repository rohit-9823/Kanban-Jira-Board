import React from "react";
import ReactDOM from "react-dom";
// import "./assets/css/style.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
if (process.env.NODE_ENV === "prod") {
  console.error = () => {};
  console.debug = () => {};
}
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
