import { ChangeEvent, memo, ReactNode, VFC } from "react";
import { Box, Checkbox, Tooltip } from "@chakra-ui/react";

type Props = {
  isChecked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  colorScheme?: string;
  tooltipText?: string;
  children?: ReactNode;
  borderColor?: string;
};

export const DefaultCheckbox: VFC<Props> = memo((props) => {
  const {
    isChecked = false,
    onChange,
    size = "md",
    colorScheme = "green",
    tooltipText = "",
    children = "",
    borderColor = "",
  } = props;

  return (
    <Tooltip label={tooltipText}>
      <Box>
        <Checkbox
          isChecked={isChecked}
          onChange={onChange}
          size={size}
          colorScheme={colorScheme}
          borderColor={borderColor}
        >
          {children}
        </Checkbox>
      </Box>
    </Tooltip>
  );
});
