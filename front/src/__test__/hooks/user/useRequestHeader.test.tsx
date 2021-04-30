import { act, renderHook } from "@testing-library/react-hooks";
import { cleanup } from "@testing-library/react";

import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

const authToken = "authToken";
const cacheControl = "cacheControl";
const client = "client";
const expiry = "expiry";
const tokenType = "tokenType";
const uid = "uid";

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("useRequestHeader custom Hook", () => {
  it("setRequestHeader", () => {
    const { result } = renderHook(() => useRequestHeader());
    const response = {
      "access-token": authToken,
      "cache-control": cacheControl,
      client: client,
      expiry: expiry,
      "token-type": tokenType,
      uid: uid,
    };

    result.current.setRequestHeader(response);
    expect(localStorage.getItem("auth_token")).toBe(authToken);
    expect(localStorage.getItem("client")).toBe(client);
    expect(localStorage.getItem("uid")).toBe(uid);
    expect(localStorage.getItem("cache-control")).toBe(null);
    expect(localStorage.getItem("expiry")).toBe(null);
    expect(localStorage.getItem("token-type")).toBe(null);
  });

  it("hasRequestHeader", () => {
    const { result } = renderHook(() => useRequestHeader());
    expect(result.current.hasRequestHeader()).toBe(false);

    localStorage.setItem("auth_token", authToken);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
    expect(result.current.hasRequestHeader()).toBe(true);
  });

  it("getRequestHeader", () => {
    const { result } = renderHook(() => useRequestHeader());
    localStorage.setItem("auth_token", authToken);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);

    const request = result.current.getRequestHeader();
    expect(request["access-token"]).toBe(authToken);
    expect(request["client"]).toBe(client);
    expect(request["uid"]).toBe(uid);
  });
});
