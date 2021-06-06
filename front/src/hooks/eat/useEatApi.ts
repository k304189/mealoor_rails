import axios from "axios";
import { useCallback } from "react";

import { Eat } from "../../types/api/eat";
import { MonthlySummary } from "../../types/api/monthlySummary";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  addEat: (
    addData: Eat,
    monthlySummary: Array<MonthlySummary> | null,
  ) => Promise<number>;
};

export const useEatApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const addEat = useCallback(
    async (addData: Eat, monthlySummary: Array<MonthlySummary> | null) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/eats`;
      const json = {
        eat: addData,
      };
      const response = await axios.post(url, json, { headers: getRequestHeader() });
      if (monthlySummary) {
        const newMonthlySummary = monthlySummary;
        const eat = response.data;
        const index = newMonthlySummary.findIndex((data) => data.date === eat.eat_date);
        if (index > -1) {
          const summary = newMonthlySummary[index];
          summary.kcal += eat.kcal;
          summary.price += eat.price;
          newMonthlySummary[index] = summary;
        } else {
          newMonthlySummary.push({
            date: eat.eat_date,
            kcal: eat.kcal,
            price: eat.price,
          });
        }
      }
      return response.status;
    }, [],
  );
  return { addEat };
};
