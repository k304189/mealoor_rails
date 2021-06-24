import { useCallback } from "react";

const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

type returnType = {
  validateNickname: (nickname: string) => { invalid: boolean, errorMsg: string };
  validateEmail: (email: string) => { invalid: boolean, errorMsg: string };
  validatePassword: (password: string) => { invalid: boolean, errorMsg: string };
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

  const validateEmail = useCallback((email: string) => {
    let invalid = false;
    let errorMsg = "";
    if (email === "") {
      invalid = true;
      errorMsg = "メールアドレスは必須項目です";
    } else if (!EMAIL_PATTERN.test(email)) {
      invalid = true;
      errorMsg = "メールアドレスの書式ではありません";
    }
    return { invalid, errorMsg };
  }, []);

  const validatePassword = useCallback((password: string) => {
    let invalid = false;
    let errorMsg = "";
    if (password.length < 6) {
      invalid = true;
      errorMsg = "パスワードは6文字以上を入力してください";
    }
    return { invalid, errorMsg };
  }, []);

  return { validateNickname, validateEmail, validatePassword };
};
