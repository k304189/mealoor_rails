import { memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  fatPercent: number;
  onChange: (v: number) => void;
  size?: "xs" | "sm" | "md" | "lg";
};

export const InputFatPercent: VFC<Props> = memo((props) => {
  const { fatPercent, onChange, size = "md" } = props;

  return (
    <DefaultInputForm
      require="require"
      label="体脂肪率"
    >
      <DefaultNumberInput
        value={fatPercent}
        onChange={onChange}
        unit="%"
        step={0.01}
        precision={1}
        size={size}
      />
    </DefaultInputForm>
  );
});
