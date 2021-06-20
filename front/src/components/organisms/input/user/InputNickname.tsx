import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  nickname: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void
};

export const InputNickname: VFC<Props> = memo((props) => {
  const { nickname, onChange, invalid, error, size = "md", onBlur } = props;

  return (
    <DefaultInputForm
      label="ニックネーム"
      require="require"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        value={nickname}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
