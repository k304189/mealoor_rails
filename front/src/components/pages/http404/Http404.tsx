import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

export const Http404: VFC = memo(() => {
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
        Http404画面です
      </Box>
    </HeaderLayout>
  );
});
