import { memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  price: number;
  onChange: (v: number) => void;
};

export const PriceForm: VFC<Props> = memo((props) => {
  const { price, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="料金"
    >
      <DefaultNumberInput
        value={price}
        onChange={onChange}
        unit="円"
      />
    </DefaultInputForm>
  );
});
