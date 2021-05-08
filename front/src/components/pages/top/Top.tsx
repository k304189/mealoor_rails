import { memo, VFC } from "react";
import { Flex } from "@chakra-ui/react";

import { SignoutHeaderLayout } from "../../templates/SignoutHeaderLayout";

export const Top: VFC = memo(() => {
  localStorage.clear();
  return (
    <SignoutHeaderLayout>
      <Flex className="main">
        <h1>Top画面です</h1>
      </Flex>
    </SignoutHeaderLayout>
  );
});
