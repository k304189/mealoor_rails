import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  eatDate: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void;
};

export const InputEatDate: VFC<Props> = memo((props) => {
  const { eatDate, onChange, invalid, error, size = "md", onBlur } = props;

  return (
    <DefaultInputForm
      require="require"
      label="食事日"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        type="date"
        value={eatDate}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
