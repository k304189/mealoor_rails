import axios from "axios";
import { useCallback } from "react";

import { SeasonalFood } from "../../types/api/seasonalFood";

type returnType = {
  addSeasonalFood: (addData: SeasonalFood) => void;
}

export const useSeasonalFoodApi = (): returnType => {
  const addSeasonalFood = useCallback((addData: SeasonalFood) => {
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
    const reqJson = {
      seasonal_food: addData,
    };
    axios
      .post(url, reqJson)
      .then((res) => {
        console.log(res);
        console.log("登録に成功しました");
      })
      .catch((e) => {
        console.log(e);
        console.log("登録失敗しました");
      });
  }, []);
  return { addSeasonalFood };
};
