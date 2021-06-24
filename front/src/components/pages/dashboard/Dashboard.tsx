import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { useUserApi } from "../../../hooks/user/useUserApi";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const Dashboard: VFC = memo(() => {
  const { isLogin } = useUserApi();

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
