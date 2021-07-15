import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { Eat } from "../../types/api/eat";
import { Health } from "../../types/api/health";
import { Dailydata, DailyDataSummary } from "../../types/api/dailydata";

type returnType = {
  getDailyData: (date: string) => Promise<number>;
  eatData: Array<Eat> | null;
  setEatData: (eatData: Array<Eat> | null) => void;
  healthData: Health | null;
  setHealthData: (health: Health | null) => void;
  breakfastSummary: DailyDataSummary | null;
  setBreakfastSummary: (summary: DailyDataSummary | null) => void;
  lunchSummary: DailyDataSummary | null;
  setLunchSummary: (summary: DailyDataSummary | null) => void;
  dinnerSummary: DailyDataSummary | null;
  setDinnerSummary: (summary: DailyDataSummary | null) => void;
  snackSummary: DailyDataSummary | null;
  setSnackSummary: (summary: DailyDataSummary | null) => void;
};

export const useDailyDataApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [eatData, setEatData] = useState<Array<Eat> | null>(null);
  const [healthData, setHealthData] = useState<Health | null>(null);
  const [breakfastSummary, setBreakfastSummary] = useState<DailyDataSummary | null>(null);
  const [lunchSummary, setLunchSummary] = useState<DailyDataSummary | null>(null);
  const [dinnerSummary, setDinnerSummary] = useState<DailyDataSummary | null>(null);
  const [snackSummary, setSnackSummary] = useState<DailyDataSummary | null>(null);

  const getDailyData = useCallback(
    async (date: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/daily_data/${date}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const dailydata: Dailydata = response.data;
      setEatData(dailydata.eat);
      setHealthData(dailydata.health);
      setBreakfastSummary(dailydata.summary.breakfast);
      setLunchSummary(dailydata.summary.lunch);
      setDinnerSummary(dailydata.summary.dinner);
      setSnackSummary(dailydata.summary.snack);
      return response.status;
    }, [],
  );
  return {
    getDailyData,
    eatData,
    setEatData,
    healthData,
    setHealthData,
    breakfastSummary,
    setBreakfastSummary,
    lunchSummary,
    setLunchSummary,
    dinnerSummary,
    setDinnerSummary,
    snackSummary,
    setSnackSummary,
  };
};
