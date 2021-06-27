import { useCallback } from "react";

type returnType = {
  validateEndDate: (endDate: string) => { invalid: boolean, errorMsg: string};
};

export const useGraphValidate = (): returnType => {
  const validateEndDate = useCallback((endDate: string) => {
    let invalid = false;
    let errorMsg = "";
    if (endDate === "") {
      invalid = true;
      errorMsg = "最終日は必須項目です";
    }
    return { invalid, errorMsg };
  }, []);
  return { validateEndDate };
};
