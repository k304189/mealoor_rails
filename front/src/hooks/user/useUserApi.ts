import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

import { User } from "../../types/api/user";
import { useRequestHeader } from "./useRequestHeader";
import { useLoginUser } from "./useLoginUser";
import { useMessage } from "../common/useMessage";

type signinUserType = {
  email: string;
  password: string;
};

type signupUserType = {
  nickname: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type updateParamType = {
  nickname?: string;
  admin?: boolean;
  password?: string;
  password_confirmation?: string;
};

type returnType = {
  users: Array<User> | null;
  getUsers: () => Promise<number>;
  showUser: (id: string) => Promise<User>;
  editUser: (id: number, updateData: updateParamType) => Promise<User>;
  deleteUser: (id: number) => Promise<number>;
  signin: (signinUser: signinUserType) => void;
  signup: (signupUser: signupUserType) => void;
  signout: () => void;
  isLogin: () => void;
};

export const useUserApi = (): returnType => {
  const history = useHistory();
  const {
    setRequestHeader,
    getRequestHeader,
    hasRequestHeader,
    clearRequestHeader,
  } = useRequestHeader();
  const { setLoginUser } = useLoginUser();
  const { showMessage } = useMessage();
  const [users, setUsers] = useState<Array<User> | null>(null);

  const getUsers = useCallback(
    async () => {
      const url = `${process.env.REACT_APP_API_V1_URL}/users`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      setUsers(response.data);
      return response.status;
    }, [],
  );

  const showUser = useCallback(
    async (id: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/users/${id}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const user: User = response.data;
      return user;
    }, [],
  );

  const editUser = useCallback(
    async (id: number, updateData: updateParamType) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/users/${id}`;
      const json = {
        user: updateData,
      };
      const response = await axios.patch(url, json, { headers: getRequestHeader() });
      const user: User = response.data;
      return user;
    }, [],
  );

  const deleteUser = useCallback(
    async (id: number) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/users/${id}`;
      const response = await axios.delete(url, { headers: getRequestHeader() });
      return response.status;
    }, [],
  );

  const signin = useCallback((signinUser: signinUserType) => {
    const url = `${process.env.REACT_APP_API_V1_URL}/auth/sign_in`;
    axios
      .post(url, signinUser)
      .then((res) => {
        setRequestHeader(res.headers);
        setLoginUser(res.data.data);
        showMessage({ title: "ログインしました", status: "success" });
        history.push("/dashboard");
      })
      .catch(() => {
        showMessage({ title: "ログインに失敗しました", status: "error" });
      });
  }, []);

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
        showMessage({ title: "ユーザーを登録しました", status: "success" });
        history.push("/dashboard");
      })
      .catch(() => {
        showMessage({ title: "ユーザー登録に失敗しました", status: "error" });
      });
  }, []);

  const signout = useCallback(() => {
    const url = `${process.env.REACT_APP_API_V1_URL}/auth/sign_out`;
    axios
      .delete(url, { headers: getRequestHeader() })
      .finally(() => {
        showMessage({ title: "ログアウトしました", status: "success" });
        clearRequestHeader();
        history.push("/");
      });
  }, []);

  const isLogin = useCallback(() => {
    const url = `${process.env.REACT_APP_API_V1_URL}/users/currentuser`;

    if (hasRequestHeader()) {
      const data = {
        headers: getRequestHeader(),
      };
      axios
        .get(url, data)
        .then((res) => {
          setLoginUser(res.data.data);
        })
        .catch(() => {
          showMessage({
            title: "認証情報が不正です。再ログインしてください",
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

  return {
    users,
    getUsers,
    showUser,
    editUser,
    deleteUser,
    signin,
    signup,
    signout,
    isLogin,
  };
};
