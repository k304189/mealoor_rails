import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

import { useCheckEmail } from "../../../hooks/user/useCheckEmail";

afterEach(() => cleanup());

describe("useCheckEmail custom Hook", () => {
  it("checkEmail Success Pattern", () => {
    const { result } = renderHook(() => useCheckEmail());
    const email = "t_e.s-t+@gmail.com";
    expect(result.current.checkEmail(email)).toBe(true);
  });

  it("checkEmail Error Pattern invalid mail id", () => {
    const { result } = renderHook(() => useCheckEmail());
    const email = "^test=@test.com";
    expect(result.current.checkEmail(email)).toBe(false);
  });

  it("checkEmail Error Pattern invalid original domain", () => {
    const { result } = renderHook(() => useCheckEmail());
    const email = "test@test^.com";
    expect(result.current.checkEmail(email)).toBe(false);
  });

  it("checkEmail Error Pattern invalid top domain ", () => {
    const { result } = renderHook(() => useCheckEmail());
    const email = "test@test.co^jp";
    expect(result.current.checkEmail(email)).toBe(false);
  });
});
