import axios from "axios";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useLogin } from "./useLogin";
import { useRequestHeader } from "./useRequestHeader";
import { useMessage } from "../common/useMessage";

type signinUserType = {
  email: string;
  password: string;
};

type returnType = {
  signin: (signinUser: signinUserType) => void;
};

export const useUserSignin = (): returnType => {
  const history = useHistory();
  const { setLoginUser } = useLogin();
  const { setRequestHeader } = useRequestHeader();
  const { showMessage } = useMessage();

  const signin = useCallback((signinUser: signinUserType) => {
    const url = `${process.env.REACT_APP_API_V1_URL}/auth/sign_in`;
    axios
      .post(url, signinUser)
      .then((res) => {
        setRequestHeader(res.headers);
        setLoginUser(res.data.data);
        history.push("/dashboard");
      })
      .catch(() => {
        showMessage({ title: "ログインに失敗しました", status: "error" });
      });
  }, []);
  return { signin };
};
