import { memo, VFC, useEffect } from "react";
import { Box } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";
import http404 from "../../../assets/http404.png";

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
      <Box className="http404" as="article" h="100%" w="100%">
        <img src={http404} alt="HTTP404" />
        <div>
          <h1>404</h1>
          <h3>Not Found</h3>
          <p>誠に申し訳ございません。</p>
          <p>アクセスしようとしたページが見つかりませんでした。</p>
          <p>
            アクセス頂いたページは削除、変更されたか、
            現在利用できない可能性があります。
          </p>
        </div>
      </Box>
    </HeaderLayout>
  );
});
