import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { DailyData } from "../../types/api/dailyData";

type returnType = {
  dailyData: Array<DailyData>
  getDailyData: (date: string) => Promise<number>;
};

export const useDailyDataApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [dailyData, setDailyData] = useState<Array<DailyData>>([]);

  const getDailyData = useCallback(
    async (date: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/daily_data/${date}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      console.log(response.data);
      return response.status;
    }, [],
  );
  return { dailyData, getDailyData };
};
