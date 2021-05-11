import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "./DefaultInputForm";
import { DefaultInput } from "../../atoms/input/DefaultInput";

type Props = {
  name: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlurName?: () => void;
  label?: string;
  isInvalid?: boolean;
  errorMsg?: string;
};

export const InputNameForm: VFC<Props> = memo((props) => {
  const {
    name,
    onChangeName,
    onBlurName = () => {},
    label = "名前",
    isInvalid = false,
    errorMsg = "",
  } = props;

  return (
    <DefaultInputForm
      label={label}
      require="require"
      isInvalid={isInvalid}
      errorMsg={errorMsg}
    >
      <DefaultInput
        value={name}
        onChange={onChangeName}
        onBlur={onBlurName}
      />
    </DefaultInputForm>
  );
});
