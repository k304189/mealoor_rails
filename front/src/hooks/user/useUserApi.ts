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
  isLogin: (isAdmin?: boolean) => Promise<boolean>;
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
        showMessage({ title: "????????????????????????", status: "success" });
        history.push("/dashboard");
      })
      .catch(() => {
        showMessage({ title: "?????????????????????????????????", status: "error" });
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
        showMessage({ title: "?????????????????????????????????", status: "success" });
        history.push("/dashboard");
      })
      .catch(() => {
        showMessage({ title: "???????????????????????????????????????", status: "error" });
      });
  }, []);

  const signout = useCallback(() => {
    const url = `${process.env.REACT_APP_API_V1_URL}/auth/sign_out`;
    axios
      .delete(url, { headers: getRequestHeader() })
      .finally(() => {
        showMessage({ title: "???????????????????????????", status: "success" });
        clearRequestHeader();
        history.push("/");
      });
  }, []);

  const isLogin = useCallback(
    async (isAdmin = false) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/users/currentuser`;
      let result = false;

      if (hasRequestHeader()) {
        const data = {
          headers: getRequestHeader(),
        };
        try {
          const response = await axios.get(url, data);
          setLoginUser(response.data.data);
          if (isAdmin) {
            if (response.data.data.admin) {
              result = true;
            } else {
              showMessage({
                title: "?????????????????????????????????",
                status: "error",
              });
              history.push("/dashboard");
            }
          } else {
            result = true;
          }
        } catch (err) {
          showMessage({
            title: "???????????????????????????????????????????????????????????????",
            status: "error",
          });
          clearRequestHeader();
          history.push("/");
        }
      } else {
        showMessage({
          title: "????????????????????????????????????",
          status: "error",
        });
        history.push("/");
      }
      return result;
    }, [],
  );

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
