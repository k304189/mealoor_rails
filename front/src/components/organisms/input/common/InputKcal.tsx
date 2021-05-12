import { memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  kcal: number;
  onChange: (v: number) => void;
};

export const InputKcal: VFC<Props> = memo((props) => {
  const { kcal, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="カロリー"
    >
      <DefaultNumberInput
        value={kcal}
        onChange={onChange}
        unit="kcal"
      />
    </DefaultInputForm>
  );
});
