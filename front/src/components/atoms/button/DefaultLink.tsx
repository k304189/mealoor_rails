import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export const DefaultLink: VFC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <Button
      bg="transparent"
      variant="link"
      boxShadow="none"
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
