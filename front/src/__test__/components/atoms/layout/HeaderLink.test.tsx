import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HeaderLink } from "../../../../components/atoms/layout/HeaderLink";

afterEach(() => cleanup());

const headerLinkText = "表示文字";
const headerLinkHtmlText = "HTML表示文字";
const callFunction = jest.fn();

describe("First Rendering", () => {
  test("render Children is text", () => {
    render(
      <HeaderLink onClick={callFunction}>{headerLinkText}</HeaderLink>,
    );
    const element = screen.queryByText(headerLinkText);
    expect(element).toBeTruthy();
    userEvent.click(element);
    expect(callFunction).toHaveBeenCalled();
  });

  test("render Children is HTML Element", () => {
    render(
      <HeaderLink onClick={callFunction}>
        <h1>{headerLinkHtmlText}</h1>
      </HeaderLink>,
    );
    const element = screen.queryByText(headerLinkHtmlText);
    expect(element).toBeTruthy();
    userEvent.click(element);
    expect(callFunction).toHaveBeenCalled();
  });
});
