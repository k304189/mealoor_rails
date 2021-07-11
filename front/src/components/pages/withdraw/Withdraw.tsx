import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

export const Withdraw: VFC = memo(() => {
  const { isLogin } = useUserApi();
  const { hasRequestHeader } = useRequestHeader();

  useEffect(() => {
    if (hasRequestHeader()) {
      isLogin();
    }
  }, []);

  return (
    <HeaderLayout>
      <Box className="withdraw" as="article" h="100%" w="100%">
        <div>
          <h1>退会処理が完了致しました。</h1>
          <p>今までご利用ありがとうございました。</p>
          <p>またの機会のご利用おまちしております。</p>
        </div>
      </Box>
    </HeaderLayout>
  );
});
