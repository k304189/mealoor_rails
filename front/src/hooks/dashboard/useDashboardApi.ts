import axios from "axios";
import { useCallback } from "react";

import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  getDashborad: () => Promise<number>;
};

export const useDashboardApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();

  const getDashborad = useCallback(
    async () => {
      const url = `${process.env.REACT_APP_API_V1_URL}/dashboard/`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      console.log(response);
      return response.status;
    }, [],
  );
  return { getDashborad };
};
