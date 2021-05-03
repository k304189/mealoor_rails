import axios from "axios";
import { useCallback, useState } from "react";

import { SeasonalFood } from "../../types/api/seasonalFood";

type returnType = {
  errorFlg: boolean;
  loading: boolean;
  allSeasonalFoods: Array<SeasonalFood>;
  addSeasonalFood: (addData: SeasonalFood) => Promise<number>;
  getAllSeasonalFoods: () => void;
  editSeasonalFood: () => Promise<any>;
}

export const useSeasonalFoodApi = (): returnType => {
  const [allSeasonalFoods, setAllSeasonalFoods] = useState<Array<SeasonalFood>>([]);
  const [errorFlg, setErrorFlg] = useState(false);
  const [loading, setLoading] = useState(false);
  const addSeasonalFood = useCallback(async (addData: SeasonalFood) => {
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foodsa`;
    const json = {
      seasonal_food: addData,
    };
    const response = await axios.post(url, json);
    setAllSeasonalFoods([...allSeasonalFoods, response.data]);
    return response.status;
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

  const editSeasonalFood = useCallback(async () => {
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
    try {
      return await axios.get(url);
    } catch (e) {
      return e;
    }
  }, []);

  return {
    errorFlg,
    loading,
    allSeasonalFoods,
    addSeasonalFood,
    getAllSeasonalFoods,
    editSeasonalFood,
  };
};
