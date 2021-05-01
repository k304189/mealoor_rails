import { Select } from "@chakra-ui/react";
import { ChangeEvent, memo, ReactNode, VFC } from "react";

type optionType = {
  value: string | number;
  displayValue?: string;
};

type Props = {
  selectedValue?: string | number;
  focusBorderColor?: string;
  optionList: Array<optionType>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const DefaultSelect: VFC<Props> = memo((props) => {
  const {
    selectedValue = "",
    focusBorderColor = "#7FDC96",
    optionList,
    onChange,
  } = props;
  return (
    <Select
      value={selectedValue}
      variant="flushed"
      focusBorderColor={focusBorderColor}
      onChange={onChange}
    >
      <option aria-label="Select" value="" />
      {optionList.map((data) => (
        <option
          key={data.value}
          value={data.value}
        >
          {data.displayValue || data.value}
        </option>
      ))}
    </Select>
  );
});
