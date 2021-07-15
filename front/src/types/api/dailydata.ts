import { Eat } from "./eat";
import { Health } from "./health";

type summary = {
  kcal: number;
  price: number;
}

export type Dailydata = {
  health: Health | null;
  eat: Array<Eat> | null;
  summary: {
    breakfast: summary | null;
    lunch: summary | null;
    dinner: summary | null;
    snack: summary | null;
  };
};
