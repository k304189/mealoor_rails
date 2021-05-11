import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  quantity: number;
  onChange: (v: number) => void;
};

export const QuantityForm: VFC<Props> = memo((props) => {
  const { quantity, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="個数"
    >
      <DefaultNumberInput
        value={quantity}
        onChange={onChange}
        unit="コ"
      />
    </DefaultInputForm>
  );
});
