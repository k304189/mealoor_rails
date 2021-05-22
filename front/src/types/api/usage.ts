export type Usage = {
  use_type: string;
  use_date: string;
  note?: string;
  cook_name?: string;
  cook_category?: string;
  limit?: string;
  eat_rate?: number;
  use_stocks: Array<{ id: number, use_rate: number }>;
};
