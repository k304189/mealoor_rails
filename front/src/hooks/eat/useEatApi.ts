import axios from "axios";
import { useCallback } from "react";

import { Eat } from "../../types/api/eat";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  addEat: (addData: Eat) => Promise<Eat>;
  editEat: (editData: Eat) => Promise<Eat>;
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
      const eat: Eat = response.data;
      return eat;
    }, [],
  );
  const editEat = useCallback(
    async (editData: Eat) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/eats/${editData.id}`;
      const json = {
        eat: editData,
      };
      const response = await axios.patch(url, json, { headers: getRequestHeader() });
      const eat: Eat = response.data;
      return eat;
    }, [],
  );
  return { addEat, editEat };
};
