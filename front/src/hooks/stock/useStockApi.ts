import axios from "axios";
import { useCallback, useState } from "react";

import { Stock } from "../../types/api/stock";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  allStocks: Array<Stock>;
  addStock: (stocks: Array<Stock>, addData: Stock) => Promise<number>;
};

export const useStockApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();
  const [allStocks, setAllStocks] = useState<Array<Stock>>([]);
  const addStock = useCallback(
    async (stocks: Array<Stock>, addData: Stock) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/stocks`;
      const json = {
        stock: addData,
      };
      const response = await axios.post(url, json, { headers: getRequestHeader() });
      const newAllStocks = stocks;
      newAllStocks.push(response.data);
      return response.status;
    }, [],
  );
  return { allStocks, addStock };
};
