import { Eat } from "./eat";
import { Health } from "./health";

export type DailyDataSummary = {
  kcal: number;
  price: number;
};

export type Dailydata = {
  health: Health | null;
  eat: Array<Eat> | null;
  summary: {
    breakfast: DailyDataSummary | null;
    lunch: DailyDataSummary | null;
    dinner: DailyDataSummary | null;
    snack: DailyDataSummary | null;
  };
};
