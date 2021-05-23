import { useCallback } from "react";

type returnType = {
  validateLimit: (limit: string) => { invalid: boolean, errorMsg: string };
};

export const useStockValidate = (): returnType => {
  const validateLimit = useCallback((limit: string) => {
    let invalid = false;
    let errorMsg = "";
    if (limit === "") {
      invalid = true;
      errorMsg = "賞味期限は必須項目です";
    }
    return { invalid, errorMsg };
  }, []);
  return { validateLimit };
};
