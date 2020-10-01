import React from "react";
import ReactDOM from 'react-dom'
import { render } from "@testing-library/react";
import MsgBox from "./MsgBox";

test("renders MsgBox", () => {
    const div = document.createElement('div');
    render(<MsgBox />, div);
    ReactDOM.unmountComponentAtNode(div);
});
