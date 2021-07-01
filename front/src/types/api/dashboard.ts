import { Stock } from "./stock";
import { Health } from "./health";

export type DateData = {
  eat: {
    id: number | null;
    date: string | null;
    kcal: number | null;
    price: number | null;
  } | null;
  health: Health | null;
};

export type Dashboard = {
  stock: Array<Stock> | null;
  today: DateData;
  yesterday: DateData;
};
