import axios from "axios";
import { useCallback, useState } from "react";

import { User } from "../../types/api/user";
import { useRequestHeader } from "./useRequestHeader";

type returnType = {
  users: Array<User> | null;
  getUsers: () => Promise<number>;
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
  return { users, getUsers };
};
