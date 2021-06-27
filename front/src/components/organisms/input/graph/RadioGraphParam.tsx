import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  label: string;
  require?: "require" | "optional";
  graphParam?: string;
  size? : "sm" | "md" | "lg";
  onChange: (v: string) => void;
};

export const RadioGraphParam: VFC<Props> = memo((props) => {
  const { label, require = "", graphParam = "", size = "md", onChange } = props;
  const buttons = [
    { value: "weight", displayValue: "体重" },
    { value: "fat_percent", displayValue: "体脂肪率（%）" },
    { value: "fat_weight", displayValue: "体脂肪量（kg）" },
    { value: "kcal", displayValue: "カロリー", color: "yellow" },
    { value: "price", displayValue: "金額", color: "yellow" },
  ];

  return (
    <DefaultInputForm
      label={label}
      require={require}
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
