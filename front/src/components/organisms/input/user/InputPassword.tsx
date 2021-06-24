import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { Password } from "../../../molecules/input/Password";

type Props = {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  label?: string;
  require?: "require" | "optional";
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void;
};

export const InputPassword: VFC<Props> = memo((props) => {
  const {
    password,
    onChange,
    invalid,
    error,
    label = "パスワード",
    require = "",
    size = "md",
    onBlur = () => {},
  } = props;

  return (
    <DefaultInputForm
      label={label}
      require={require}
      isInvalid={invalid}
      errorMsg={error}
    >
      <Password
        value={password}
        onChange={onChange}
        size={size}
        onBlur={onBlur}
      />
    </DefaultInputForm>
  );
});
