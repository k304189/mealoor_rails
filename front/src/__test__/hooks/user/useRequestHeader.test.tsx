import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

const authToken = "authToken";
const client = "client";
const uid = "uid";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("useRequestHeader custom Hook", () => {
  it("hasRequestHeader", () => {
    const { result } = renderHook(() => useRequestHeader());
    expect(result.current.hasRequestHeader()).toBe(false);

    localStorage.setItem("auth_token", authToken);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
    expect(result.current.hasRequestHeader()).toBe(true);
  });
});
