import axios from "axios";
import { useCallback } from "react";

import { Health } from "../../types/api/health";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  addHealth: (addData: Health) => Promise<Health>;
};

export const useHealthApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const addHealth = useCallback(
    async (addData: Health) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/healths`;
      const json = {
        health: addData,
      };
      const response = await axios.post(url, json, { headers: getRequestHeader() });
      const health: Health = response.data;
      return health;
    }, [],
  );
  return { addHealth };
};
