import { memo, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";

import { DefaultFontIcon } from "../../atoms/icon/DefaultFontIcon";

type Props = {
  bg?: string;
  color?: string;
  tooltipText?: string;
  onClick: () => void;
}

export const HealthButton: VFC<Props> = memo((props) => {
  const { bg = "#00B894", color = "#FFFFFF", tooltipText = "体調登録", onClick } = props;
  return (
    <Button bg={bg} onClick={onClick}>
      <DefaultFontIcon
        icon={faFileMedical}
        tooltipText={tooltipText}
        color={color}
      />
    </Button>
  );
});
