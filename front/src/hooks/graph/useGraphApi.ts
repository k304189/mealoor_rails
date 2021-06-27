import axios from "axios";
import { useCallback } from "react";

import { GraphDatasetType } from "../../types/pages/graph/graphDatasetType";
import { GraphDataType } from "../../types/pages/graph/graphDataType";
import { useRequestHeader } from "../user/useRequestHeader";

type returnType = {
  getGraphData: (line: string, bar: string) => Promise<GraphDataType>;
};

const rand = () => Math.round(Math.random() * 20 - 10);

const labels = [
  "2021/6/1", "2021/6/2", "2021/6/3", "2021/6/4", "2021/6/5",
  "2021/6/6", "2021/6/7", "2021/6/8", "2021/6/9", "2021/6/10",
  "2021/6/11", "2021/6/12", "2021/6/13", "2021/6/14", "2021/6/15",
  "2021/6/16", "2021/6/17", "2021/6/18", "2021/6/19", "2021/6/20",
  "2021/6/21", "2021/6/22", "2021/6/23", "2021/6/24", "2021/6/25",
  "2021/6/26", "2021/6/27", "2021/6/28", "2021/6/29", "2021/6/30",
];

const testData = [
  rand(), rand(), rand(), rand(), rand(),
  rand(), rand(), rand(), rand(), rand(),
  rand(), rand(), rand(), rand(), rand(),
  rand(), rand(), rand(), rand(), rand(),
  rand(), rand(), rand(), rand(), rand(),
  rand(), rand(), rand(), rand(), rand(),
];

const getGraphConfig = (column: string) => {
  const configList = [];
  if (column === "weight") {
    configList.push({ color: "#3182CE", label: "体重" });
  } else if (column === "fat_percent") {
    configList.push({ color: "#38A169", label: "体脂肪率" });
  } else if (column === "fat_weight") {
    configList.push({ color: "#E53E3E", label: "体脂肪量" });
  } else if (column === "kcal" || column === "price") {
    configList.push({ color: "#9BF6FF", label: "朝食" });
    configList.push({ color: "#FDFFB6", label: "昼食" });
    configList.push({ color: "#FFADAD", label: "夕食" });
    configList.push({ color: "#CAFFBF", label: "間食" });
  }
  return configList;
};

const getDataset = (
  type: string,
  label: string,
  color: string,
  data:Array<number>,
): GraphDatasetType => {
  const dataset: GraphDatasetType = {
    type,
    label,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 3,
    data,
  };
  return dataset;
};

export const useGraphApi = (): returnType => {
  const { getRequestHeader } = useRequestHeader();

  const getGraphData = useCallback(
    async (line: string, bar: string) => {
      const datasets: Array<GraphDatasetType> = [];
      const lineConfig = getGraphConfig(line);
      lineConfig.forEach((config) => {
        datasets.push(
          getDataset("line", config.label, config.color, testData),
        );
      });

      if (bar) {
        const barConfig = getGraphConfig(bar);
        barConfig.forEach((config) => {
          datasets.push(
            getDataset("bar", config.label, config.color, testData),
          );
        });
      }
      return {
        labels,
        datasets,
      };
    }, [],
  );
  return { getGraphData };
};
