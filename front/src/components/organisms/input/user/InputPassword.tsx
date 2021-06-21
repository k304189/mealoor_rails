import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { Password } from "../../../molecules/input/Password";

type Props = {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const InputPassword: VFC<Props> = memo((props) => {
  const { password, onChange, label = "パスワード", size = "md" } = props;

  return (
    <DefaultInputForm
      label={label}
      require="require"
    >
      <Password
        value={password}
        onChange={onChange}
        size={size}
      />
    </DefaultInputForm>
  );
});
