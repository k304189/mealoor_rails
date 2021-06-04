import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  eatType? : string;
  size? : "sm" | "md" | "lg";
  onChange: (v: string) => void;
};

export const RadioEatType:VFC<Props> = memo((props) => {
  const { eatType = "", size = "md", onChange } = props;
  const buttons = [
    { value: "自炊" },
    { value: "中食" },
    { value: "間食" },
  ];
  return (
    <DefaultInputForm
      label="食事タイプ"
      require="require"
    >
      <DefaultRadio
        value={eatType}
        onChange={onChange}
        buttons={buttons}
        size={size}
      />
    </DefaultInputForm>
  );
});
