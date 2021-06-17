import { memo, VFC } from "react";
import { Button } from "@chakra-ui/react";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import { DefaultFontIcon } from "../../atoms/icon/DefaultFontIcon";

type Props = {
  bg?: string;
  color?: string;
  tooltipText?: string;
  onClick: () => void;
}

export const EatButton: VFC<Props> = memo((props) => {
  const { bg = "#FF8800", color = "#FFFFFF", tooltipText = "食事登録", onClick } = props;
  return (
    <Button bg={bg} onClick={onClick}>
      <DefaultFontIcon
        icon={faUtensils}
        tooltipText={tooltipText}
        color={color}
      />
    </Button>
  );
});
