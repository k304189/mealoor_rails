import { memo, VFC } from "react";
import {
  InputGroup,
  InputRightAddon,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";

type Props = {
  value?: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg" | "xs";
  precision?: number;
  unit?: string;
  focusBorderColor?: string;
};

export const DefaultNumberInput: VFC<Props> = memo((props) => {
  const {
    onChange,
    value = 0,
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    step = 1,
    size = "md",
    precision = 0,
    unit = "",
    focusBorderColor = "#7FDC96",
  } = props;

  return (
    <InputGroup size={size}>
      <NumberInput
        allowMouseWheel
        defaultValue={value}
        min={min}
        max={max}
        step={step}
        precision={precision}
        onChange={(vs: string, vn: number) => { onChange(vn); }}
        focusBorderColor={focusBorderColor}
        variant="flushed"
      >
        <NumberInputField
          textAlign="right"
        />
      </NumberInput>
      { unit
        ? (<InputRightAddon>{unit}</InputRightAddon>)
        : (<div />) }
    </InputGroup>
  );
});
