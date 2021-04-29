import axios from "axios";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useRequestHeader } from "./useRequestHeader";
import { useLogin } from "./useLogin";
import { useMessage } from "../common/useMessage";

type returnType = {
  isLogin: () => void;
}

export const useIsLogin = (): returnType => {
  const url = `${process.env.REACT_APP_API_V1_URL}/users/currentuser`;
  const history = useHistory();
  const { getRequestHeader, hasRequestHeader } = useRequestHeader();
  const { setLoginUser } = useLogin();
  const { showMessage } = useMessage();

  const isLogin = useCallback(() => {
    if (hasRequestHeader()) {
      const data = {
        headers: getRequestHeader(),
      };
      axios
        .get(url, data)
        .then((res) => {
          setLoginUser(res.data.data);
          showMessage({
            title: "ログインしました",
            status: "success",
          });
        })
        .catch(() => {
          showMessage({
            title: "ログインに失敗しました",
            status: "error",
          });
          localStorage.clear();
          history.push("/");
        });
    } else {
      showMessage({
        title: "認証情報が見つかりません",
        status: "error",
      });
      history.push("/");
    }
  }, []);
  return { isLogin };
};
