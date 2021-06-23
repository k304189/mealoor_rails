import { Center, Tooltip } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = {
  onClick: () => void;
  px?: number;
  children: ReactNode;
  tooltipText?: string;
};

export const HeaderLink: VFC<Props> = memo((props) => {
  const { onClick, px = 0, children, tooltipText = "" } = props;
  const hover = {
    cursor: "pointer",
    backgroundColor: "#E2E8F0",
  };
  return (
    <Tooltip label={tooltipText}>
      <Center
        as="a"
        px={px}
        onClick={onClick}
        _hover={hover}
        h="100%"
      >
        {children}
      </Center>
    </Tooltip>
  );
});
