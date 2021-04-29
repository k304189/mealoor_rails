import { useCallback } from "react";

type responseHeader = {
  "access-token": string;
  "cache-control": string;
  client: string;
  expiry: string;
  "token-type": string;
  uid: string;
};

type requestHeader = {
  "access-token": string;
  client: string;
  uid: string;
};

type returnType = {
  setRequestHeader: (header: responseHeader) => void;
  hasRequestHeader: () => boolean;
  getRequestHeader: () => requestHeader;
};

export const useRequestHeader = (): returnType => {
  const setRequestHeader = useCallback((header: responseHeader) => {
    localStorage.setItem("auth_token", header["access-token"]);
    localStorage.setItem("client", header.client);
    localStorage.setItem("uid", header.uid);
  }, []);

  const hasRequestHeader = useCallback((): boolean => {
    let result = false;
    if (localStorage.getItem("auth_token")) {
      result = true;
    }
    return result;
  }, []);

  const getRequestHeader = useCallback((): requestHeader => {
    const token = localStorage.getItem("auth_token") || "";
    const client = localStorage.getItem("client") || "";
    const uid = localStorage.getItem("uid") || "";

    const header = {
      "access-token": token,
      client,
      uid,
    };
    return header;
  }, []);
  return { setRequestHeader, hasRequestHeader, getRequestHeader };
};
