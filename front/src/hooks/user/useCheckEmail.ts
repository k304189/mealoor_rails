import { useCallback } from "react";

const PATTERN = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

type returnType = {
  checkEmail: (email: string) => boolean;
};

export const useCheckEmail = (): returnType => {
  const checkEmail = useCallback((email: string): boolean => {
    return PATTERN.test(email);
  }, []);
  return { checkEmail };
};
