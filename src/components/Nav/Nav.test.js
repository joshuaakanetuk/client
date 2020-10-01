import React from "react";
import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import Nav from "./Nav";
import { BrowserRouter } from "react-router-dom";

test("renders Nav", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <Nav />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
