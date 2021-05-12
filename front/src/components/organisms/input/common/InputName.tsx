import { ChangeEvent, memo, useState, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputName: VFC<Props> = memo((props) => {
  const { name, onChange } = props;
  const [invalid, setInvalid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const validate = (checkValue: string) => {
    let errmsg = "";
    let status = false;
    if (checkValue === "") {
      errmsg = "必須項目です。選択してください";
      status = true;
    } else if (checkValue.length > 30) {
      errmsg = "カテゴリーは30文字までです。設定値を見直ししてください";
      status = true;
    }
    setErrorMsg(errmsg);
    setInvalid(status);
  };

  return (
    <DefaultInputForm
      label="名前"
      require="require"
      isInvalid={invalid}
      errorMsg={errorMsg}
    >
      <DefaultInput
        value={name}
        onChange={onChange}
        onBlur={() => { validate(name); }}
      />
    </DefaultInputForm>
  );
});
