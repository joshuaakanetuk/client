import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import ProjectDetail from "./ProjectDetail";
import { AppProvider } from "../../../contexts/AppContext";

test("renders ProjectDetail", () => {
  const div = document.createElement("div");
  render(
    <AppProvider>
      <ProjectDetail match={{ params: { id: 1 }, isExact: true, path: "/signin", url: "/" }} />
    </AppProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
