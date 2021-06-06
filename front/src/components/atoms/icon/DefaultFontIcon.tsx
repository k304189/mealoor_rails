import { memo, VFC } from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: IconDefinition;
  color?: string;
  tooltipText?: string;
};

export const DefaultFontIcon: VFC<Props> = memo((props) => {
  const {
    icon,
    color = "#FFFFFF",
    tooltipText = "",
  } = props;
  return (
    <Tooltip label={tooltipText}>
      <Box color={color}>
        <FontAwesomeIcon icon={icon} />
      </Box>
    </Tooltip>
  );
});
