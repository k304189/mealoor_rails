export type User = {
  allow_password_change?: boolean;
  email: string;
  id: number;
  image?: string | null;
  nickname?: string | null;
  provider?: string | null;
  uid?: string | null;
  admin: boolean;
};
