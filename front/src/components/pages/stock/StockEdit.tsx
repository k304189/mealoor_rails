import { memo, VFC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const StockEdit: VFC = memo(() => {
  return (
    <SigninHeaderLayout>
      <Flex className="main" align="center" justify="center">
        <Box as="article" w="95%" h="95%">
          <h1>食材編集画面です。</h1>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
