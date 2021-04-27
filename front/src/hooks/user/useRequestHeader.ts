import { useCallback } from "react";

type resHeader = {
  'access-token': string;
  'cache-control': string;
  client: string;
  expiry: string;
  'token-type': string;
  uid: string;
};

export const useRequestHeader = () => {

  const setRequestHeader = useCallback((header: resHeader) => {
    localStorage.setItem('auth_token', header['access-token']);
    localStorage.setItem('client', header['client']);
    localStorage.setItem('uid', header['uid']);
  }, []);

  const getRequestHeader = useCallback(() => {
    const auth_token =localStorage.getItem('auth_token');
    let header = null;
    if(auth_token) {
      header = {
        'access-token': localStorage.getItem('auth_token'),
        'client': localStorage.getItem('client'),
        'uid': localStorage.getItem('uid'),
      };
    }
    return header;
  }, []);
  return { setRequestHeader, getRequestHeader };
};
