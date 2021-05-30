import { memo, ReactElement, VFC } from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";

type Props = {
  aria_label: string;
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  colorScheme?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tooltipText?: string;
  children: ReactElement;
};

export const DefaultIcon: VFC<Props> = memo((props) => {
  const {
    aria_label,
    onClick,
    isDisabled = false,
    isLoading = false,
    colorScheme = "green",
    size = "sm",
    tooltipText = "",
    children,
  } = props;
  return (
    <Tooltip label={tooltipText}>
      <IconButton
        aria-label={aria_label}
        icon={children}
        variant="outline"
        isDisabled={isDisabled}
        isLoading={isLoading}
        colorScheme={colorScheme}
        size={size}
        onClick={onClick}
      />
    </Tooltip>
  );
});
