import axios from "axios";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useRequestHeader } from "./useRequestHeader";
import { useLogin } from "./useLogin"
import { useMessage } from "../common/useMessage";

export const useIsLogin = () => {
  const url = process.env.REACT_APP_API_V1_URL + "/users/currentuser";
  const history = useHistory();
  const { getRequestHeader } = useRequestHeader();
  const { setLoginUser } = useLogin();
  const { showMessage } = useMessage();

  const isLogin = useCallback(() => {
    const header = getRequestHeader();
    const data = {
      headers: header
    };
    if(header) {
      axios
        .get(url, data)
        .then((res) => {
          setLoginUser(res.data.data);
          showMessage({
            title: "ログインしました",
            status: "success"
          });
        })
        .catch((res) => {
          showMessage({
            title: "ログインに失敗しました",
            status: "error"
          });
          localStorage.clear();
          history.push("/");
        })
    } else {
      showMessage({
        title: "認証情報が見つかりません",
        status: "error"
      });
      history.push("/");
    }
  }, []);
  return { isLogin }
};
