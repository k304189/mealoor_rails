import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

export const Top: VFC = memo(() => {
  const { isLogin } = useUserApi();
  const { hasRequestHeader } = useRequestHeader();

  useEffect(() => {
    if (hasRequestHeader()) {
      isLogin();
    }
  }, []);

  return (
    <HeaderLayout>
      <Box as="article" h="100%" w="100%">
        <h1>Top画面です</h1>
      </Box>
    </HeaderLayout>
  );
});
