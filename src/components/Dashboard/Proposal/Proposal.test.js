import React from "react";
import ReactDOM from 'react-dom'
import { render } from "@testing-library/react";
import Proposal from './Proposal'

test("renders Proposal", () => {
    const div = document.createElement('div');
    render(<Proposal />, div);
    ReactDOM.unmountComponentAtNode(div);
});
