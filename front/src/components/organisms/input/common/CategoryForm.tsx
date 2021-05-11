import { ChangeEvent, memo, useState, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { SelectCategory } from "../../../molecules/select/SelectCategory";

type Props = {
  category: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const CategoryForm: VFC<Props> = memo((props) => {
  const { category, onChange } = props;
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
      label="カテゴリー"
      require="require"
      isInvalid={invalid}
      errorMsg={errorMsg}
    >
      <SelectCategory
        selectedValue={category}
        onChange={onChange}
        onBlur={() => { validate(category); }}
      />
    </DefaultInputForm>
  );
});
