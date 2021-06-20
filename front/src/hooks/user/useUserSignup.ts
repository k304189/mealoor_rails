import axios from "axios";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useLogin } from "./useLogin";
import { useRequestHeader } from "./useRequestHeader";
import { useMessage } from "../common/useMessage";

type signupUserType = {
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type returnType = {
  signup: (signupUser: signupUserType) => void;
};

export const useUserSignup = (): returnType => {
  const history = useHistory();
  const { setLoginUser } = useLogin();
  const { setRequestHeader } = useRequestHeader();
  const { showMessage } = useMessage();

  const signup = useCallback((signupUser: signupUserType) => {
    const url = `${process.env.REACT_APP_API_V1_URL}/auth/`;
    const json = {
      registration: signupUser,
    };
    axios
      .post(url, json)
      .then((res) => {
        setRequestHeader(res.headers);
        setLoginUser(res.data.data);
        history.push("/dashboard");
      })
      .catch(() => {
        showMessage({ title: "ユーザー登録に失敗しました", status: "error" });
      });
  }, []);
  return { signup };
};
