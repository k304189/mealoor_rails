import axios from "axios";
import { useCallback, useState } from "react";

import { SeasonalFood } from "../../types/api/seasonalFood";

type returnType = {
  errorFlg: boolean;
  loading: boolean;
  addSeasonalFood: (addData: SeasonalFood) => void;
  getAllSeasonalFoods: () => void;
  allSeasonalFoods: Array<SeasonalFood>;
}

export const useSeasonalFoodApi = (): returnType => {
  const [allSeasonalFoods, setAllSeasonalFoods] = useState<Array<SeasonalFood>>([]);
  const [errorFlg, setErrorFlg] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const getAllSeasonalFoods = useCallback(() => {
    setLoading(true);
    setErrorFlg(false);
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
    axios
      .get(url)
      .then((res) => {
        setAllSeasonalFoods(res.data);
      })
      .catch(() => {
        setErrorFlg(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { errorFlg, loading, addSeasonalFood, getAllSeasonalFoods, allSeasonalFoods };
};
