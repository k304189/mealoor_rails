import { memo, VFC } from "react";
import { MinusIcon } from "@chakra-ui/icons";

import { DefaultIcon } from "../../atoms/button/DefaultIcon";

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  colorScheme?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tooltipText?: string;
};

export const MinusButton: VFC<Props> = memo((props) => {
  const {
    onClick,
    isDisabled = false,
    isLoading = false,
    colorScheme = "green",
    size = "sm",
    tooltipText = "",
  } = props;
  return (
    <DefaultIcon
      aria_label="マイナス"
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
      colorScheme={colorScheme}
      size={size}
      tooltipText={tooltipText}
    >
      <MinusIcon />
    </DefaultIcon>
  );
});
