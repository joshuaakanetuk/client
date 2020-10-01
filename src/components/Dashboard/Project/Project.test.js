import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Project from "./Project";
import { AppProvider } from "../../../contexts/AppContext";
import { BrowserRouter } from "react-router-dom";

test("renders Project", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <AppProvider>
        <Project project={{ end_timeframe: new Date() }} />
      </AppProvider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
