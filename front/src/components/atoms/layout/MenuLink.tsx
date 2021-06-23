import { memo, ReactNode, VFC } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const MenuLink: VFC<Props> = memo((props) => {
  const { children, onClick } = props;
  const hover = {
    cursor: "pointer",
    backgroundColor: "#E2E8F0",
  };

  return (
    <Box
      w="100%"
      onClick={onClick}
      py={2}
      pl={5}
      _hover={hover}
    >
      {children}
    </Box>
  );
});
