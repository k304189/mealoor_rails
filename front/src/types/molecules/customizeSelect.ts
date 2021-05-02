import { ChangeEvent, FocusEvent } from "react";

export type CustomizeSelect = {
  selectedValue?: string | number;
  focusBorderColor?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
};
