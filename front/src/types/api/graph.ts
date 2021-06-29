export type Graph = {
  labels: Array<string>;
  health: Array<number>;
  eat: {
    breakfast: Array<number>;
    lunch: Array<number>;
    dinner: Array<number>;
    snack: Array<number>;
  };
};
