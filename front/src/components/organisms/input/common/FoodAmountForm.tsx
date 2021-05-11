import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  amount: number;
  onChange: (v: number) => void;
};

export const FoodAmountForm: VFC<Props> = memo((props) => {
  const { amount, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="量"
    >
      <DefaultNumberInput
        value={amount}
        onChange={onChange}
      />
    </DefaultInputForm>
  );
});
