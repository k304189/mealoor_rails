import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  stockType? : string;
  onChange: (v: string) => void;
};

export const RadioStockType:VFC<Props> = memo((props) => {
  const { stockType = "", onChange } = props;
  const stockTypeCook = "料理";
  const buttons = [
    { value: "食材" },
    { value: "中食" },
    { value: stockTypeCook, isReadOnly: true },
  ];
  return (
    <DefaultInputForm
      label="食料タイプ"
      require="optional"
      helperMsg="「料理」は選択・変更ができません"
    >
      <DefaultRadio
        value={stockType}
        onChange={onChange}
        buttons={buttons}
        isReadOnly={stockType === stockTypeCook}
      />
    </DefaultInputForm>
  );
});
