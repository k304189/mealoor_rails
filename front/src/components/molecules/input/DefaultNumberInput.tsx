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
    precision = 0,
    unit = "",
    focusBorderColor = "#7FDC96",
  } = props;

  return (
    <InputGroup>
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
        <NumberInputField />
      </NumberInput>
      <InputRightAddon>{unit}</InputRightAddon>
    </InputGroup>
  );
});
