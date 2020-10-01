import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
