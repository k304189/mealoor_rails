import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  onBlur: () => void
};

export const InputName: VFC<Props> = memo((props) => {
  const { name, onChange, invalid, error, onBlur } = props;

  return (
    <DefaultInputForm
      label="名前"
      require="require"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        value={name}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultInputForm>
  );
});
