import { memo, VFC, useEffect } from "react";
import { Flex } from "@chakra-ui/react";

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
      <Flex className="main">
        <h1>Top画面です</h1>
      </Flex>
    </HeaderLayout>
  );
});
