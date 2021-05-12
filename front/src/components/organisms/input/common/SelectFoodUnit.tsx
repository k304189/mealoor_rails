import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { FoodUnit } from "../../../molecules/select/FoodUnit";

type Props = {
  unit: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectFoodUnit: VFC<Props> = memo((props) => {
  const { unit, onChange } = props;

  return (
    <DefaultInputForm
      label="単位"
      require="optional"
    >
      <FoodUnit
        selectedValue={unit}
        onChange={onChange}
      />
    </DefaultInputForm>
  );
});
