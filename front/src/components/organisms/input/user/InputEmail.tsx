import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  email: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  isReadOnly?: boolean;
  error?: string;
  require?: "require" | "optional";
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void
};

export const InputEmail: VFC<Props> = memo((props) => {
  const {
    email,
    require = "",
    onChange,
    invalid = false,
    isReadOnly = false,
    error = "",
    size = "md",
    onBlur,
  } = props;

  return (
    <DefaultInputForm
      label="メールアドレス"
      require={require}
      isInvalid={invalid}
      isReadOnly={isReadOnly}
      errorMsg={error}
    >
      <DefaultInput
        value={email}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
