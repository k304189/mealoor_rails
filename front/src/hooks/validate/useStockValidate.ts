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
      errorMsg = "必須項目です。入力してください";
    }
    return { invalid, errorMsg };
  }, []);
  return { validateLimit };
};
