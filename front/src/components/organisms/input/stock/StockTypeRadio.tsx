import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";

type Props = {
  defaultValue? : string;
  onChange: (v: string) => void;
};

export const StockTypeRadio:VFC<Props> = memo((props) => {
  const { defaultValue = "", onChange } = props;
  const buttons = [
    { value: "食材" },
    { value: "中食" },
    { value: "料理" },
  ];
  return (
    <DefaultRadio
      defaultValue={defaultValue}
      onChange={onChange}
      buttons={buttons}
    />
  );
});
