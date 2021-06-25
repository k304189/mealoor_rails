import { memo, ReactNode, VFC } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  bg?: string;
  color?: string;
  children: ReactNode;
};

export const MenuSection: VFC<Props> = memo((props) => {
  const { bg = "transparent", color = "#000000", children } = props;
  return (
    <Box w="100%" p={2} bg={bg} color={color}>
      {children}
    </Box>
  );
});
