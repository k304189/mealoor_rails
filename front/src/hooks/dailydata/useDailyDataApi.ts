import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { Eat } from "../../types/api/eat";

type returnType = {
  getDailyData: (date: string) => Promise<number>;
  eatData: Array<Eat> | null;
};

export const useDailyDataApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [eatData, setEatData] = useState<Array<Eat> | null>(null);

  const getDailyData = useCallback(
    async (date: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/daily_data/${date}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const { eat } : { eat: Array<Eat> } = response.data;
      if (eat) {
        setEatData(eat);
      }
      return response.status;
    }, [],
  );
  return { getDailyData, eatData };
};
