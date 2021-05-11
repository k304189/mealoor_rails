import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { SelectStockUnit } from "../../../molecules/select/SelectStockUnit";

type Props = {
  unit: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const FoodUnitForm: VFC<Props> = memo((props) => {
  const { unit, onChange } = props;

  return (
    <DefaultInputForm
      label="単位"
      require="optional"
    >
      <SelectStockUnit
        selectedValue={unit}
        onChange={onChange}
      />
    </DefaultInputForm>
  );
});
