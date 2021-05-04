import { memo, VFC } from "react";
import { IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  colorScheme?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const DeleteButton: VFC<Props> = memo((props) => {
  const {
    onClick,
    isDisabled = false,
    isLoading = false,
    colorScheme = "green",
    size = "sm",
  } = props;
  return (
    <IconButton
      aria-label="削除"
      icon={<DeleteIcon />}
      variant="outline"
      isDisabled={isDisabled}
      isLoading={isLoading}
      colorScheme={colorScheme}
      size={size}
      onClick={onClick}
    />
  );
});
