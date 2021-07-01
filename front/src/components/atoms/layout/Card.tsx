import { memo, ReactNode, VFC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  bg?: string;
  color?: string;
  icon?: IconDefinition | null;
  label: string;
  children: ReactNode;
};

export const Card: VFC<Props> = memo((props) => {
  const {
    bg = "#000000",
    color = "#FFFFFF",
    icon = null,
    label,
    children,
  } = props;

  return (
    <Box bg={bg} color={color}>
      <Box p={2} w="100%" fontSize="2xl">
        <Flex align="center">
          { icon ? <FontAwesomeIcon icon={icon} /> : <></> }
          <Box ml={2}>
            {label}
          </Box>
        </Flex>
      </Box>
      <Box w="100%">
        {children}
      </Box>
    </Box>
  );
});
