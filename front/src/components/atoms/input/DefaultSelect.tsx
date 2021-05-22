import { Select } from "@chakra-ui/react";
import { ChangeEvent, memo, VFC } from "react";

type optionType = {
  value: string | number;
  displayValue?: string;
};

type Props = {
  selectedValue?: string | number;
  focusBorderColor?: string;
  size?: "xs" | "sm" | "md" | "lg";
  optionList: Array<optionType>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
};

export const DefaultSelect: VFC<Props> = memo((props) => {
  const {
    selectedValue = "",
    focusBorderColor = "#7FDC96",
    size = "md",
    optionList,
    onChange,
    onBlur = () => {},
  } = props;
  return (
    <Select
      value={selectedValue}
      variant="flushed"
      focusBorderColor={focusBorderColor}
      onChange={onChange}
      onBlur={onBlur}
      size={size}
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
