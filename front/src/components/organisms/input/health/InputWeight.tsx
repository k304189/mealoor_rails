import { memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  weight: number;
  onChange: (v: number) => void;
  size?: "xs" | "sm" | "md" | "lg";
};

export const InputWeight: VFC<Props> = memo((props) => {
  const { weight, onChange, size = "md" } = props;

  return (
    <DefaultInputForm
      require="require"
      label="体重"
    >
      <DefaultNumberInput
        value={weight}
        onChange={onChange}
        unit="kg"
        step={0.01}
        precision={1}
        size={size}
      />
    </DefaultInputForm>
  );
});
