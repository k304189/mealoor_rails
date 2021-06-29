import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  graphParam?: string;
  size? : "sm" | "md" | "lg";
  onChange: (v: string) => void;
};

export const RadioLineParam: VFC<Props> = memo((props) => {
  const { graphParam = "", size = "md", onChange } = props;
  const buttons = [
    { value: "weight", displayValue: "体重" },
    { value: "fat_weight", displayValue: "体脂肪量（kg）" },
  ];

  return (
    <DefaultInputForm
      label="線グラフ"
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
