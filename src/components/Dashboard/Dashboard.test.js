import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "../../contexts/AppContext";

test("renders Dashboard", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <AppProvider>
        <Dashboard />
      </AppProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
