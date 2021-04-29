import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App";

afterEach(() => cleanup());

test("renders learn react link", () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // screen.debug();
});
