import axios from "axios";
import { useCallback, useState } from "react";

import { SeasonalFood } from "../../types/api/seasonalFood";

type returnType = {
  allSeasonalFoods: Array<SeasonalFood>;
  addSeasonalFood: (
    seasonalFoods: Array<SeasonalFood>,
    addData: SeasonalFood,
  ) => Promise<number>;
  getAllSeasonalFoods: () => Promise<number>;
  editSeasonalFood: (
    seasonalFoods: Array<SeasonalFood>,
    editData: SeasonalFood,
  ) => Promise<number>;
  deleteSeasonalFood: (
    seasonalFoods: Array<SeasonalFood>,
    id: number
  ) => Promise<number>;
};

export const useSeasonalFoodApi = (): returnType => {
  const [allSeasonalFoods, setAllSeasonalFoods] = useState<Array<SeasonalFood>>([]);
  const addSeasonalFood = useCallback(
    async (seasonalFoods: Array<SeasonalFood>, addData: SeasonalFood) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
      const json = {
        seasonal_food: addData,
      };
      const response = await axios.post(url, json);
      const newAllSeasonalFood = seasonalFoods;
      newAllSeasonalFood.push(response.data);
      return response.status;
    }, [],
  );

  const getAllSeasonalFoods = useCallback(async (): Promise<number> => {
    const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods`;
    const response = await axios.get(url);
    setAllSeasonalFoods(response.data);
    return response.status;
  }, []);

  const editSeasonalFood = useCallback(
    async (seasonalFoods: Array<SeasonalFood>, editData: SeasonalFood) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods/${editData.id}`;
      const json = {
        seasonal_food: editData,
      };
      const response = await axios.patch(url, json);
      const index = seasonalFoods.findIndex((seasonalFood) => seasonalFood.id === editData.id);
      if (index !== -1) {
        const newAllSeasonalFood = seasonalFoods;
        newAllSeasonalFood[index] = response.data;
      }
      return response.status;
    }, [],
  );

  const deleteSeasonalFood = useCallback(
    async (seasonalFoods: Array<SeasonalFood>, id: number) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/seasonal_foods/${id}`;
      const response = await axios.delete(url);
      const index = seasonalFoods.findIndex((seasonalFood) => seasonalFood.id === id);
      if (index !== -1) {
        const newAllSeasonalFood = seasonalFoods;
        newAllSeasonalFood.splice(index, 1);
      }
      return response.status;
    }, [],
  );

  return {
    allSeasonalFoods,
    addSeasonalFood,
    getAllSeasonalFoods,
    editSeasonalFood,
    deleteSeasonalFood,
  };
};
