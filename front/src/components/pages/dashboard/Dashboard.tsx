import { memo, VFC, useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { useIsLogin } from "../../../hooks/user/useIsLogin";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const Dashboard: VFC = memo(() => {
  const { isLogin } = useIsLogin();
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <SigninHeaderLayout>
      <Box as="article" w="95%" h="95%">
        <h1>ログイン後のダッシュボード画面です</h1>
      </Box>
    </SigninHeaderLayout>
  );
});
