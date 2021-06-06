import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { MonthlySummary } from "../../types/api/monthlySummary";

type returnType = {
  monthlySummary: Array<MonthlySummary>;
  getMonthlySummary: (from: string, to: string) => Promise<number>;
};

export const useCalendarApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [monthlySummary, setMonthlySummary] = useState<Array<MonthlySummary>>([]);

  const getMonthlySummary = useCallback(
    async (from: string, to: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/calendars?from=${from}&to=${to}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      setMonthlySummary(response.data);
      return response.status;
    }, [],
  );
  return { monthlySummary, getMonthlySummary };
};
