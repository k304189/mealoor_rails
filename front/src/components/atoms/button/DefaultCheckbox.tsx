import { ChangeEvent, memo, ReactNode, VFC } from "react";
import { Checkbox } from "@chakra-ui/react";

type Props = {
  isChecked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  colorScheme?: string;
  children?: ReactNode;
}

export const DefaultCheckbox: VFC<Props> = memo((props) => {
  const {
    isChecked = false,
    onChange,
    size = "md",
    colorScheme = "green",
    children = "",
  } = props;

  return (
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      size={size}
      colorScheme={colorScheme}
    >
      {children}
    </Checkbox>
  );
});
