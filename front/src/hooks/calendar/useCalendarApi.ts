import axios from "axios";
import { useCallback, useState } from "react";

import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  getMonthlySummary: (from: string, to: string) => Promise<number>;
};

export const useCalendarApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const getMonthlySummary = useCallback(
    async (from: string, to: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/calendars?from=${from}&to=${to}`;
      const params = {
        headers: getRequestHeader(),
      };
      const response = await axios.get(url, params);
      console.log(response.data);
      return response.status;
    }, [],
  );
  return { getMonthlySummary };
};
