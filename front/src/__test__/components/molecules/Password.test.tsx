import React, { ChangeEvent, useState } from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Password } from "../../../components/molecules/input/Password";

const value = "value";
const onChangeFunction = jest.fn();
const placeholder = "パスワード";

const INPUT_TYPE_PASSWORD = "password";
const INPUT_TYPE_TEXT = "text";
const ICON_ID_VIEW_ICON = "view-icon";
const ICON_ID_VIEW_OFFICON = "view-officon";

afterEach(() => cleanup());

describe("First Rendering", () => {
  test("render Password component", () => {
    render(
      <Password
        value={value}
        onChange={onChangeFunction}
        placeholder={placeholder}
      />
    );
    const inputElement = screen.getByPlaceholderText(placeholder);
    const showIcon = screen.getByTestId(ICON_ID_VIEW_ICON);
    expect(inputElement).toBeTruthy();
    expect(inputElement.type).toBe(INPUT_TYPE_PASSWORD);
    expect(inputElement.value).toBe(value);
    expect(showIcon).toBeTruthy();
  });

});

describe("Input Text Call On Change Function", () => {
  test("When Input Text, Call onChange", () => {
    render(
      <Password
        value={value}
        onChange={onChangeFunction}
        placeholder={placeholder}
      />
    );
    const inputElement = screen.getByPlaceholderText(placeholder);
    userEvent.type(inputElement, "text");
    expect(onChangeFunction).toHaveBeenCalled();
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
