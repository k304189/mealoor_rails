import axios from "axios";
import { useCallback, useState } from "react";

import { Stock } from "../../types/api/stock";
import { Usage } from "../../types/api/usage";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  allStocks: Array<Stock>;
  addStock: (stocks: Array<Stock>, addData: Stock) => Promise<number>;
  getHavingStock: () => Promise<number>;
  editStock: (stocks: Array<Stock>, addData: Stock) => Promise<number>;
  useStock: (stocks: Array<Stock>, usage: Usage, useType: string) => Promise<number>;
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

  const getHavingStock = useCallback(
    async () => {
      const url = `${process.env.REACT_APP_API_V1_URL}/stocks`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      setAllStocks(response.data);
      return response.status;
    }, [],
  );

  const editStock = useCallback(
    async (stocks: Array<Stock>, editData: Stock) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/stocks/${editData.id}`;
      const json = {
        stock: editData,
      };
      const response = await axios.patch(url, json, { headers: getRequestHeader() });
      const index = stocks.findIndex((stock) => stock.id === editData.id);
      if (index !== -1) {
        const newAllStocks = stocks;
        newAllStocks[index] = response.data;
      }
      return response.status;
    }, [],
  );

  const useStock = useCallback(
    async (stocks: Array<Stock>, usage: Usage, useType: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/stocks/${useType}`;
      const json = {
        usage,
      };
      const response = await axios.post(url, json, { headers: getRequestHeader() });
      const tempStocks = stocks;
      response.data.forEach((target: Stock) => {
        const index = tempStocks.findIndex((stock) => target.id === stock.id);
        const checkRemain = target?.remain ?? -1;
        if (index > -1 && checkRemain !== -1) {
          if (checkRemain > 0) {
            tempStocks[index] = target;
          } else {
            tempStocks.splice(index, 1);
          }
        } else {
          tempStocks.push(target);
        }
      });
      return response.status;
    }, [],
  );
  return { allStocks, addStock, getHavingStock, editStock, useStock };
};
