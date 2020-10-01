import React from "react";
import { render } from "@testing-library/react";
import SignIn from "./SignIn";
import { AppProvider } from "../../contexts/AppContext";

test("renders Signin Component", () => {
  render(
    <AppProvider>
      <SignIn
        match={{ params: { id: 1 }, isExact: true, path: "/signin", url: "/" }}
      />
    </AppProvider>
  );
});
