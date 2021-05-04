import axios from "axios";
import { useCallback, useState } from "react";

import { SeasonalFood } from "../../types/api/seasonalFood";

type returnType = {
  addSeasonalFood: (addData: SeasonalFood) => Promise<number>;
  getAllSeasonalFoods: () => Promise<Array<SeasonalFood>>;
  editSeasonalFood: () => Promise<any>;
}

export const useSeasonalFoodApi = (): returnType => {
  const [allSeasonalFoods, setAllSeasonalFoods] = useState<Array<SeasonalFood>>([]);
  const addSeasonalFood = useCallback(async (addData: SeasonalFood) => {
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
    const json = {
      seasonal_food: addData,
    };
    const response = await axios.post(url, json);
    setAllSeasonalFoods([...allSeasonalFoods, response.data]);
    return response.status;
  }, []);

  const getAllSeasonalFoods = useCallback(async (): Promise<Array<SeasonalFood>> => {
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
    const response = await axios.get(url);
    return response.data;
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
    addSeasonalFood,
    getAllSeasonalFoods,
    editSeasonalFood,
  };
};
