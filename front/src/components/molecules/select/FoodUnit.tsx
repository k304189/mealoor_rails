import { memo, VFC } from "react";

import { DefaultSelect } from "../../atoms/input/DefaultSelect";
import { CustomizeSelect } from "../../../types/molecules/customizeSelect";

export const FoodUnit: VFC<CustomizeSelect> = memo((props) => {
  const { selectedValue = "", onChange, onBlur = () => {} } = props;
  const stockUnitOption = [
    { value: "g" },
    { value: "ml" },
  ];
  return (
    <DefaultSelect
      selectedValue={selectedValue}
      optionList={stockUnitOption}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});
