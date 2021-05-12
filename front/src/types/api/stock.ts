export type Stock = {
  id: number;
  user_id: number;
  name: string;
  category: string;
  limit: string;
  stock_type?: string;
  shop?: string;
  amount?: number;
  unit?: string;
  protein?: number;
  quantity?: number;
  kcal?: number;
  price?: number;
  discounted?: boolean;
  note?: string;
  remain?: number;
};
