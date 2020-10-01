import React from "react";
import ReactDOM from 'react-dom'
import { render } from "@testing-library/react";
import ProjectList from './ProjectList'
import { BrowserRouter } from "react-router-dom";

test("renders ProjectList", () => {
    const div = document.createElement('div');
    render(<BrowserRouter>
    <ProjectList />
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
