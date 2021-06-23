import { memo, VFC } from "react";
import { Flex } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";

export const Top: VFC = memo(() => {
  localStorage.clear();
  return (
    <HeaderLayout>
      <Flex className="main">
        <h1>Top画面です</h1>
      </Flex>
    </HeaderLayout>
  );
});
