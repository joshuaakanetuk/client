import React from "react";
import ReactDOM from 'react-dom'
import { render } from "@testing-library/react";
import Landing from './Landing'

test("renders Landing", () => {
    const div = document.createElement('div');
    render(<Landing />, div);
    ReactDOM.unmountComponentAtNode(div);
});
