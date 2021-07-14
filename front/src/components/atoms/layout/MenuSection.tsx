import { memo, ReactNode, VFC } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  sectionClass?: string;
  children: ReactNode;
};

export const MenuSection: VFC<Props> = memo((props) => {
  const {
    sectionClass = "",
    children,
  } = props;

  return (
    <Box w="100%" p={2} mt={1} className={sectionClass}>
      {children}
    </Box>
  );
});
