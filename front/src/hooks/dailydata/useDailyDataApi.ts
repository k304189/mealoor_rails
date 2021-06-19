import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { Eat } from "../../types/api/eat";
import { Health } from "../../types/api/health";

type returnType = {
  getDailyData: (date: string) => Promise<number>;
  eatData: Array<Eat> | null;
  setEatData: (eatData: Array<Eat> | null) => void;
  healthData: Health | null;
  setHealthData: (health: Health | null) => void;
};

export const useDailyDataApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [eatData, setEatData] = useState<Array<Eat> | null>(null);
  const [healthData, setHealthData] = useState<Health | null>(null);

  const getDailyData = useCallback(
    async (date: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/daily_data/${date}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const { eat, health } : { eat: Array<Eat>, health: Health } = response.data;
      if (eat) {
        setEatData(eat);
      }
      if (health) {
        setHealthData(health);
      }
      return response.status;
    }, [],
  );
  return { getDailyData, eatData, setEatData, healthData, setHealthData };
};
