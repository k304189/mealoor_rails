export type StockUse = {
  use_type: string;
  use_date: string;
  note?: string;
  eat_timing?: string;
  cook_name?: string;
  cook_category?: string;
  limit?: string;
  use_stocks: Array<{ id: number, use_rate: number }>;
};
