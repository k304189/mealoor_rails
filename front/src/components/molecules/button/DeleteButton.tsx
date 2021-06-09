import { memo, VFC } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

import { DefaultIcon } from "../../atoms/button/DefaultIcon";

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  colorScheme?: string;
  size?: "xs" | "sm" | "md" | "lg";
  tooltipText?: string;
};

export const DeleteButton: VFC<Props> = memo((props) => {
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
      aria_label="削除"
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
      colorScheme={colorScheme}
      size={size}
      tooltipText={tooltipText}
    >
      <DeleteIcon />
    </DefaultIcon>
  );
});
