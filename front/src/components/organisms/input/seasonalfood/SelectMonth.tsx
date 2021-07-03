import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { Month } from "../../../molecules/select/Month";

type Props = {
  label: string;
  month: number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void;
};

export const SelectMonth: VFC<Props> = memo((props) => {
  const { label, month, onChange, invalid, error, size = "md", onBlur } = props;

  return (
    <DefaultInputForm
      label={label}
      require="require"
      isInvalid={invalid}
      errorMsg={error}
    >
      <Month
        selectedValue={month}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
