import { useCallback } from "react";

type returnType = {
  validateNickname: (nickname: string) => { invalid: boolean, errorMsg: string};
};

export const useUserValidate = (): returnType => {
  const validateNickname = useCallback((nickname: string) => {
    let invalid = false;
    let errorMsg = "";
    if (nickname === "") {
      invalid = true;
      errorMsg = "ニックネームは必須項目です";
    } else if (nickname.length > 50) {
      invalid = true;
      errorMsg = "ニックネームは50文字以内にしてください";
    }
    return { invalid, errorMsg };
  }, []);
  return { validateNickname };
};
