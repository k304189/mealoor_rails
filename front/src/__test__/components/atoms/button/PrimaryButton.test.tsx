import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PrimaryButton } from "../../../../components/atoms/button/PrimaryButton";

afterEach(() => cleanup());

const buttonText = "ボタン"
const onClickFunction = jest.fn();

describe("First Rendering", () => {
  test("render Input Component", () => {
    render(
      <PrimaryButton
        onClick={onClickFunction}
      >
        {buttonText}
      </PrimaryButton>,
    );
    const button = screen.getByText(buttonText);
    expect(button).toBeTruthy();
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    expect(onClickFunction).toHaveBeenCalled();
  });
});

describe("Click Button Call Function", () => {
  test("When able button is Clicked, Call onClick function", () => {
    render(
      <PrimaryButton
        onClick={onClickFunction}
      >
        {buttonText}
      </PrimaryButton>,
    );
    const button = screen.getByText(buttonText);
    userEvent.click(button);
    expect(onClickFunction).toHaveBeenCalled();
  });

  test("When disable button is Clicked, Not Call onClick function", () => {
    render(
      <PrimaryButton
        onClick={onClickFunction}
        disabled={true}
      >
        {buttonText}
      </PrimaryButton>,
    );
    const button = screen.getByText(buttonText);
    userEvent.click(button);
    expect(onClickFunction).not.toHaveBeenCalled();
  });
});
