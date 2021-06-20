import axios from "axios";
import { useCallback, useState } from "react";

import { User } from "../../types/api/user";
import { useRequestHeader } from "./useRequestHeader";

type updateParamType = {
  nickname: string;
  admin?: boolean;
};

type returnType = {
  users: Array<User> | null;
  getUsers: () => Promise<number>;
  showUser: (id: string) => Promise<User>;
  editUser: (updateData: updateParamType) => Promise<User>;
};

export const useUserApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
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
    async (updateData: updateParamType) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/auth`;
      const json = {
        registration: updateData,
      };
      const response = await axios.put(url, json, { headers: getRequestHeader() });
      const user: User = response.data.data;
      return user;
    }, [],
  );

  return { users, getUsers, showUser, editUser };
};
