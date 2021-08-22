import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal"
import "./index.css";
import { SmarpApp } from "./smarp-app";

Modal.setAppElement("#root")

ReactDOM.render(
  <React.StrictMode>
    <SmarpApp />
  </React.StrictMode>,
  document.getElementById("root")
);