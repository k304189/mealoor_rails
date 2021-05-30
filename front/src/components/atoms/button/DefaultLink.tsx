import { memo, ReactNode, VFC } from "react";
import { Button, Tooltip } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  tooltipText: string;
  onClick: () => void;
};

export const DefaultLink: VFC<Props> = memo((props) => {
  const { children, tooltipText, onClick } = props;
  return (
    <Tooltip label={tooltipText}>
      <Button
        bg="transparent"
        variant="link"
        boxShadow="none"
        onClick={onClick}
      >
        {children}
      </Button>
    </Tooltip>
  );
});
