import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  note: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void
};

export const InputNote: VFC<Props> = memo((props) => {
  const { note, onChange, invalid, error, size = "md", onBlur } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="一言メモ"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        value={note}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
