import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { Eat } from "../../types/api/eat";

type returnType = {
  getDailyData: (date: string) => Promise<number>;
  breakfast: Array<Eat> | null;
  lunch: Array<Eat> | null;
  dinner: Array<Eat> | null;
  snack: Array<Eat> | null;
};

export const useDailyDataApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [breakfast, setBreakfast] = useState<Array<Eat> | null>(null);
  const [lunch, setLunch] = useState<Array<Eat> | null>(null);
  const [dinner, setDinner] = useState<Array<Eat> | null>(null);
  const [snack, setSnack] = useState<Array<Eat> | null>(null);

  const getDailyData = useCallback(
    async (date: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/daily_data/${date}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const { eat } : { eat: Array<Eat> } = response.data;
      if (eat) {
        const eatBreakfast = eat.filter((data) => data.eat_timing === "朝食");
        const eatLunch = eat.filter((data) => data.eat_timing === "昼食");
        const eatDinner = eat.filter((data) => data.eat_timing === "夕食");
        const eatSnack = eat.filter((data) => data.eat_timing === "間食");

        if (eatBreakfast) {
          setBreakfast(eatBreakfast);
        }
        if (eatLunch) {
          setLunch(eatLunch);
        }
        if (eatDinner) {
          setDinner(eatDinner);
        }
        if (eatSnack) {
          setSnack(eatSnack);
        }
      }
      return response.status;
    }, [],
  );
  return { getDailyData, breakfast, lunch, dinner, snack };
};
