import axios from "axios";
import { useCallback } from "react";

import { useRequestHeader } from "../user/useRequestHeader";
import { Dashboard } from "../../types/api/dashboard";

type returnType = {
  getDashborad: () => Promise<Dashboard>;
};

export const useDashboardApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();

  const getDashborad = useCallback(
    async () => {
      const url = `${process.env.REACT_APP_API_V1_URL}/dashboard/`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      return response.data;
    }, [],
  );
  return { getDashborad };
};
