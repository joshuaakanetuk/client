import React from "react";
import ReactDOM from 'react-dom'
import { render } from "@testing-library/react";
import Permission from "./Permission";

test("renders Permission", () => {
    const div = document.createElement('div');
    render(<Permission />, div);
    ReactDOM.unmountComponentAtNode(div);
});
