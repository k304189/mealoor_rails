import { ChangeEvent, memo, VFC } from "react";
import { Flex } from "@chakra-ui/react";

import { DefaultCheckbox } from "../../../atoms/button/DefaultCheckbox";

type Props = {
  discounted: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckDiscounted: VFC<Props> = memo((props) => {
  const { discounted, onChange } = props;
  return (
    <Flex h="100%" align="end">
      <DefaultCheckbox
        isChecked={discounted}
        onChange={onChange}
        size="lg"
      >
        割引
      </DefaultCheckbox>
    </Flex>
  );
});
