import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  stockType? : string;
  onChange: (v: string) => void;
};

export const RadioStockType:VFC<Props> = memo((props) => {
  const { stockType = "", onChange } = props;
  const buttons = [
    { value: "食材" },
    { value: "中食" },
    { value: "料理" },
  ];
  return (
    <DefaultInputForm
      label="食料タイプ"
      require="optional"
    >
      <DefaultRadio
        value={stockType}
        onChange={onChange}
        buttons={buttons}
      />
    </DefaultInputForm>
  );
});
