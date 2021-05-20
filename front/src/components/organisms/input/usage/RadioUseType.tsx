import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  useType? : string;
  onChange: (v: string) => void;
};

export const RadioUseType:VFC<Props> = memo((props) => {
  const { useType = "", onChange } = props;
  const buttons = [
    { value: "料理" },
    { value: "食事" },
    { value: "処分" },
    { value: "分割" },
  ];
  return (
    <DefaultInputForm
      label="区分"
      require="require"
    >
      <DefaultRadio
        defaultValue={useType}
        onChange={onChange}
        buttons={buttons}
      />
    </DefaultInputForm>
  );
});
