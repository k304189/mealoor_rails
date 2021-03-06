import { memo, VFC } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type ButtonType = {
  value: string;
  displayValue?: string;
  color?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  buttons: Array<ButtonType>
  isReadOnly?: boolean;
  size?: "sm" | "md" | "lg";
};

export const DefaultRadio: VFC<Props> = memo((props) => {
  const { value, onChange, buttons, isReadOnly = false, size = "md" } = props;
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
    >
      <Stack spacing={5} direction="row">
        {buttons.map((data) => {
          return (
            <Radio
              key={data.value}
              value={data.value}
              colorScheme={data.color || "green"}
              isDisabled={data.isDisabled || false}
              isReadOnly={isReadOnly || data.isReadOnly || false}
              size={size}
            >
              {data.displayValue || data.value}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
});
