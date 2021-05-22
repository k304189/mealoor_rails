import { ChangeEvent } from "react";

export type CustomizeSelect = {
  selectedValue?: string | number;
  focusBorderColor?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
};
