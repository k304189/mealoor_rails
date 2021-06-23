import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useIsLogin } from "../../../hooks/user/useIsLogin";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const Dashboard: VFC = memo(() => {
  const { isLogin } = useIsLogin();

  useEffect(() => {
    isLogin();
  }, []);

  return (
    <HeaderLayout>
      <Box as="article" w="95%" h="95%">
        <h1>ログイン後のダッシュボード画面です</h1>
      </Box>
    </HeaderLayout>
  );
});
