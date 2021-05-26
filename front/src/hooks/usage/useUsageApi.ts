import axios from "axios";
import { useCallback, useState } from "react";

import { Usage } from "../../types/api/usage";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  historyUsages: Array<Usage>;
  foodstuffUsages: Array<Usage>;
  getHistoryUsage: (id: number) => Promise<number>;
  getFoodstuffUsage: (id: number) => Promise<number>;
};

export const useUsageApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [historyUsages, setHistoryUsages] = useState<Array<Usage>>([]);
  const [foodstuffUsages, setFoodsutuffUsages] = useState<Array<Usage>>([]);
  const getHistoryUsage = useCallback(
    async (id: number) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/usages/history/${id}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      setHistoryUsages(response.data);
      return response.status;
    }, [],
  );

  const getFoodstuffUsage = useCallback(
    async (id: number) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/usages/foodstuff/${id}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      setFoodsutuffUsages(response.data);
      return response.status;
    }, [],
  );

  return { historyUsages, foodstuffUsages, getHistoryUsage, getFoodstuffUsage };
};
