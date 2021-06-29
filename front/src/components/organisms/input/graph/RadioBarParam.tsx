import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  graphParam?: string;
  size? : "sm" | "md" | "lg";
  onChange: (v: string) => void;
};

export const RadioBarParam: VFC<Props> = memo((props) => {
  const { graphParam = "", size = "md", onChange } = props;
  const buttons = [
    { value: "kcal", displayValue: "カロリー", color: "yellow" },
    { value: "price", displayValue: "金額", color: "yellow" },
  ];

  return (
    <DefaultInputForm
      label="棒グラフ"
      require="require"
    >
      <DefaultRadio
        value={graphParam}
        onChange={onChange}
        buttons={buttons}
        size={size}
      />
    </DefaultInputForm>
  );
});
