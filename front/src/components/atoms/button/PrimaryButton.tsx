import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg" | "xs";
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const {
    children,
    disabled = false,
    loading = false,
    size = "md",
    onClick,
  } = props;
  return (
    <Button
      bg="#FF6D62"
      color="white"
      _hover={{ opacity: "0.8" }}
      disabled={disabled || loading}
      isLoading={loading}
      size={size}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
