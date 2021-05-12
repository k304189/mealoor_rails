import { ChangeEvent, memo, useState, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  limit: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputLimit: VFC<Props> = memo((props) => {
  const { limit, onChange } = props;
  const [invalid, setInvalid] = useState(false);
  const validate = (checkValue: string) => {
    setInvalid(checkValue === "");
  };

  return (
    <DefaultInputForm
      require="require"
      label="賞味期限"
      isInvalid={invalid}
      errorMsg="必須項目です。選択してください"
    >
      <DefaultInput
        type="date"
        value={limit}
        onChange={onChange}
        onBlur={() => { validate(limit); }}
      />
    </DefaultInputForm>
  );
});
