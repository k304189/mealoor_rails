import { memo, VFC } from "react";

import { DefaultSelect } from "../../atoms/input/DefaultSelect";
import { CustomizeSelect } from "../../../types/molecules/customizeSelect";

export const FoodLocation: VFC<CustomizeSelect> = memo((props) => {
  const { selectedValue = "", onChange, onBlur = () => {} } = props;
  const foodLocationOption = [
    { value: "冷蔵庫" },
    { value: "冷凍庫" },
    { value: "常温" },
  ];
  return (
    <DefaultSelect
      selectedValue={selectedValue}
      optionList={foodLocationOption}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});
