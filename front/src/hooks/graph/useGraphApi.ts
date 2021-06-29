import axios from "axios";
import { useCallback } from "react";

import { Graph } from "../../types/api/graph";
import { GraphDatasetType } from "../../types/pages/graph/graphDatasetType";
import { GraphDataType } from "../../types/pages/graph/graphDataType";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  getGraphData: (line: string, bar: string, to:string) => Promise<GraphDataType>;
};

const rand = () => Math.round(Math.random() * 20 - 10);

const getGraphConfig = (column: string) => {
  let config = { color: "#000000", label: "ラベル" };
  if (column === "weight") {
    config = { color: "#3182CE", label: "体重" };
  } else if (column === "fat_percent") {
    config = { color: "#38A169", label: "体脂肪率" };
  } else if (column === "fat_weight") {
    config = { color: "#E53E3E", label: "体脂肪量" };
  } else if (column === "breakfast") {
    config = { color: "#9BF6FF", label: "朝食" };
  } else if (column === "lunch") {
    config = { color: "#FDFFB6", label: "昼食" };
  } else if (column === "dinner") {
    config = { color: "#FFADAD", label: "夕食" };
  } else if (column === "snack") {
    config = { color: "#CAFFBF", label: "間食" };
  }
  return config;
};

const getDataset = (
  type: string,
  label: string,
  color: string,
  data:Array<number | null>,
): GraphDatasetType => {
  const dataset: GraphDatasetType = {
    type,
    label,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 3,
    spanGaps: true,
    data,
  };
  return dataset;
};

export const useGraphApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();

  const getGraphData = useCallback(
    async (line: string, bar: string, to: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/graph?to=${to}&health=${line}&eat=${bar}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const graphData: Graph = response.data;

      const datasets: Array<GraphDatasetType> = [];
      const lineConfig = getGraphConfig(line);
      datasets.push(
        getDataset(
          "line",
          lineConfig.label,
          lineConfig.color,
          graphData.health,
        ),
      );

      const breakfastConfig = getGraphConfig("breakfast");
      const lunchConfig = getGraphConfig("lunch");
      const dinnerConfig = getGraphConfig("dinner");
      const snackConfig = getGraphConfig("snack");

      datasets.push(
        getDataset(
          "bar",
          breakfastConfig.label,
          breakfastConfig.color,
          graphData.eat.breakfast,
        ),
      );

      datasets.push(
        getDataset(
          "bar",
          lunchConfig.label,
          lunchConfig.color,
          graphData.eat.lunch,
        ),
      );

      datasets.push(
        getDataset(
          "bar",
          dinnerConfig.label,
          dinnerConfig.color,
          graphData.eat.dinner,
        ),
      );

      datasets.push(
        getDataset(
          "bar",
          snackConfig.label,
          snackConfig.color,
          graphData.eat.snack,
        ),
      );

      return {
        labels: graphData.labels,
        datasets,
      };
    }, [],
  );
  return { getGraphData };
};
