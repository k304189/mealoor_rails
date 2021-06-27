import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  endDate: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void;
};

export const InputEndDate: VFC<Props> = memo((props) => {
  const { endDate, onChange, invalid, error, size = "md", onBlur } = props;

  return (
    <DefaultInputForm
      require="require"
      label="最終日"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        type="date"
        value={endDate}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
