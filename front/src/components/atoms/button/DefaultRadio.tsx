import { memo, VFC } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

type ButtonType = {
  value: string;
  displayValue?: string;
  color?: string;
  isDisabled?: boolean;
};

type Props = {
  value: string;
  onChange: (v: string) => void;
  buttons: Array<ButtonType>
};

export const DefaultRadio: VFC<Props> = memo((props) => {
  const { value, onChange, buttons } = props;
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
            >
              {data.displayValue || data.value}
            </Radio>
          );
        })}
      </Stack>
    </RadioGroup>
  );
});
