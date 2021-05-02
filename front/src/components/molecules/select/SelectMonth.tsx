import { memo, VFC } from "react";

import { DefaultSelect } from "../../atoms/input/DefaultSelect";
import { CustomizeSelect } from "../../../types/molecules/customizeSelect";

export const SelectMonth: VFC<CustomizeSelect> = memo((props) => {
  const { selectedValue = "", onChange, onBlur = () => {} } = props;
  const monthOption = [
    { value: 1, displayValue: "1月" },
    { value: 2, displayValue: "2月" },
    { value: 3, displayValue: "3月" },
    { value: 4, displayValue: "4月" },
    { value: 5, displayValue: "5月" },
    { value: 6, displayValue: "6月" },
    { value: 7, displayValue: "7月" },
    { value: 8, displayValue: "8月" },
    { value: 9, displayValue: "9月" },
    { value: 10, displayValue: "10月" },
    { value: 11, displayValue: "11月" },
    { value: 12, displayValue: "12月" },
  ];
  return (
    <DefaultSelect
      selectedValue={selectedValue}
      optionList={monthOption}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
});
