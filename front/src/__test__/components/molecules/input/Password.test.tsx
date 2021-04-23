import React, { ChangeEvent, useState } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Password } from "../../../../components/molecules/input/Password";

const value = "value";
const onChangeFunction = jest.fn();
const placeholder = "パスワード（確認用）"

const DEFAULT_PLACEHOLDER = "パスワード";
const INPUT_TYPE_PASSWORD = "password";
const INPUT_TYPE_TEXT = "text";
const ICON_ID_VIEW_ICON = "view-icon";
const ICON_ID_VIEW_OFFICON = "view-officon";

afterEach(() => cleanup());

describe("Placeholder Test", () => {
  test("Set Placeholder", () => {
    render(
      <Password
        value={value}
        onChange={onChangeFunction}
        placeholder={placeholder}
      />
    );
    const defaultInputElement = screen.queryByPlaceholderText(DEFAULT_PLACEHOLDER);
    const setInputElement = screen.queryByPlaceholderText(placeholder);
    expect(defaultInputElement).toBeNull();
    expect(setInputElement).not.toBeNull();
  });

  test("Not Set Placeholder", () => {
    render(
      <Password
        value={value}
        onChange={onChangeFunction}
      />
    );
    const defaultInputElement = screen.queryByPlaceholderText(DEFAULT_PLACEHOLDER);
    const setInputElement = screen.queryByPlaceholderText(placeholder);
    expect(defaultInputElement).not.toBeNull();
    expect(setInputElement).toBeNull();
  });
});

describe("Toggle Icon and Input Type", () => {
  test("Toggle Icon and Text Type", () => {
    render(
      <Password
        value={value}
        onChange={onChangeFunction}
        placeholder={placeholder}
      />
    );
    const inputElement = screen.getByPlaceholderText(placeholder);
    let displayIcon = screen.getByTestId(ICON_ID_VIEW_ICON);
    expect(inputElement.type).toBe(INPUT_TYPE_PASSWORD);
    expect(screen.queryByTestId(ICON_ID_VIEW_ICON)).not.toBeNull();
    expect(screen.queryByTestId(ICON_ID_VIEW_OFFICON)).toBeNull();

    userEvent.click(displayIcon);
    expect(inputElement.type).toBe(INPUT_TYPE_TEXT);
    expect(screen.queryByTestId(ICON_ID_VIEW_ICON)).toBeNull();
    expect(screen.queryByTestId(ICON_ID_VIEW_OFFICON)).not.toBeNull();
    displayIcon = screen.getByTestId(ICON_ID_VIEW_OFFICON);

    userEvent.click(displayIcon);
    expect(inputElement.type).toBe(INPUT_TYPE_PASSWORD);
    expect(screen.queryByTestId(ICON_ID_VIEW_ICON)).not.toBeNull();
    expect(screen.queryByTestId(ICON_ID_VIEW_OFFICON)).toBeNull();

  });
});
