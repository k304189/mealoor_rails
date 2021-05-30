import { memo, VFC } from "react";
import { AddIcon } from "@chakra-ui/icons";

import { DefaultIcon } from "../../atoms/button/DefaultIcon";

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  colorScheme?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tooltipText?: string;
};

export const AddButton: VFC<Props> = memo((props) => {
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
      aria_label="プラス"
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
      colorScheme={colorScheme}
      size={size}
      tooltipText={tooltipText}
    >
      <AddIcon />
    </DefaultIcon>
  );
});
