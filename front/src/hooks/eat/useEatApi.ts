import axios from "axios";
import { useCallback } from "react";

import { Eat } from "../../types/api/eat";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  addEat: (addData: Eat) => Promise<number>;
};

export const useEatApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const addEat = useCallback(
    async (addData: Eat) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/eats`;
      const json = {
        eat: addData,
      };
      const response = await axios.post(url, json, { headers: getRequestHeader() });
      return response.status;
    }, [],
  );
  return { addEat };
};
