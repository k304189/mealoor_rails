import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  limit: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  onBlur: () => void;
};

export const InputLimit: VFC<Props> = memo((props) => {
  const { limit, onChange, invalid, error, onBlur } = props;

  return (
    <DefaultInputForm
      require="require"
      label="賞味期限"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        type="date"
        value={limit}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultInputForm>
  );
});
