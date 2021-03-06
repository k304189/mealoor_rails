import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg" | "xs";
  colorScheme?: string;
};

export const SecondaryButton: VFC<Props> = memo((props) => {
  const {
    children,
    disabled = false,
    loading = false,
    onClick,
    size = "md",
    colorScheme = "green",
  } = props;
  return (
    <Button
      colorScheme={colorScheme}
      size={size}
      variant="outline"
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
