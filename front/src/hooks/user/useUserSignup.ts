import axios from "axios";
import { useCallback } from "react";

type signup = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export const useUserSignup = () => {
  const signup = useCallback((signupUser: signup) => {
    const url = process.env.REACT_APP_API_V1_URL + "/api/v1/auth/";
    axios
      .post(url, signupUser)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        alert("データ取得に失敗しました");
        console.log(e);
      });
  }, []);
  return { signup };
};
