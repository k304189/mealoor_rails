import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DefaultInput } from "../../../../components/atoms/input/DefaultInput";

afterEach(() => cleanup());

const type = "text";
const value = "value";
const onChangeFunction = jest.fn();
const placeholder = "テスト";

describe("First Rendering", () => {
  test("render Input Component", () => {
    render(
      <DefaultInput
        type={type}
        value={value}
        onChange={onChangeFunction}
        placeholder={placeholder}
      />,
    );
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeTruthy();
    expect(inputElement.type).toBe(type);
    expect(inputElement.value).toBe(value);
    userEvent.type(inputElement, "abc");
    expect(onChangeFunction).toHaveBeenCalled();
  });
});
