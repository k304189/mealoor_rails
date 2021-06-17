import { memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  fatWeight: number;
  onChange: (v: number) => void;
  size?: "xs" | "sm" | "md" | "lg";
};

export const InputFatWeight: VFC<Props> = memo((props) => {
  const { fatWeight, onChange, size = "md" } = props;

  return (
    <DefaultInputForm
      label="体脂肪量"
      isReadOnly
    >
      <DefaultNumberInput
        value={fatWeight}
        onChange={onChange}
        unit="kg"
        step={0.01}
        size={size}
      />
    </DefaultInputForm>
  );
});
