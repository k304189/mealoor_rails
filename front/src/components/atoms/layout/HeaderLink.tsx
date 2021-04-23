import { Center } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = {
  onClick: () => void;
  px?: number;
  opacity?: string;
  children: ReactNode;
};

export const HeaderLink: VFC<Props> = memo((props) => {
  const { onClick, px=0, opacity="0.8", children } = props;
  return (
    <Center
      as="a"
      px={px}
      onClick={onClick}
      _hover={{ cursor: "pointer", opacity: opacity }}
      h="100%"
    >
      {children}
    </Center>
  );
});
