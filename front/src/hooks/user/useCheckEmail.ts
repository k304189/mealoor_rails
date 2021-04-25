import { useCallback } from "react";

const PATTERN = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export const useCheckEmail = () => {
  const checkEmail = useCallback((email: string) => {
    return PATTERN.test(email);
  }, []);
  return { checkEmail };
}
