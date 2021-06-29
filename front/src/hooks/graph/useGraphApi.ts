import axios from "axios";
import { useCallback } from "react";

import { Graph } from "../../types/api/graph";
import { GraphDatasetType } from "../../types/pages/graph/graphDatasetType";
import { GraphDataType } from "../../types/pages/graph/graphDataType";
import { useRequestHeader } from "../user/useRequestHeader";

const Y_AXIS_ID_HEALTH = "y-axis-health";
const Y_AXIS_ID_EAT = "y-axis-eat";

type returnType = {
  getGraphData: (line: string, bar: string, to:string) => Promise<GraphDataType>;
};

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
  yAxisID = "",
): GraphDatasetType => {
  const dataset: GraphDatasetType = {
    type,
    label,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 3,
    spanGaps: true,
    data,
    yAxisID,
  };
  return dataset;
};

export const useGraphApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();

  const getGraphData = useCallback(
    async (line: string, bar: string, to: string) => {
      const url = `${process.env.REACT_APP_API_V1_URL}/graph?to=${to}&health=${line}&eat=${bar}`;
      const response = await axios.get(url, { headers: getRequestHeader() });
      const graph: Graph = response.data;

      const datasets: Array<GraphDatasetType> = [];
      const lineConfig = getGraphConfig(line);
      datasets.push(
        getDataset(
          "line",
          lineConfig.label,
          lineConfig.color,
          graph.health,
          Y_AXIS_ID_HEALTH,
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
          graph.eat.breakfast,
          Y_AXIS_ID_EAT,
        ),
      );

      datasets.push(
        getDataset(
          "bar",
          lunchConfig.label,
          lunchConfig.color,
          graph.eat.lunch,
          Y_AXIS_ID_EAT,
        ),
      );

      datasets.push(
        getDataset(
          "bar",
          dinnerConfig.label,
          dinnerConfig.color,
          graph.eat.dinner,
          Y_AXIS_ID_EAT,
        ),
      );

      datasets.push(
        getDataset(
          "bar",
          snackConfig.label,
          snackConfig.color,
          graph.eat.snack,
          Y_AXIS_ID_EAT,
        ),
      );

      const graphData: GraphDataType = {
        labels: graph.labels,
        datasets,
      };

      return graphData;
    }, [],
  );
  return { getGraphData };
};
