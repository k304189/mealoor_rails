import { memo, useEffect, useState, VFC } from "react";
import { Box, Flex } from "@chakra-ui/react";

import { GraphParamForm } from "../../organisms/graph/GraphParamForm";
import { HeaderLayout } from "../../templates/HeaderLayout";

import { useUserApi } from "../../../hooks/user/useUserApi";
import { useMessage } from "../../../hooks/common/useMessage";

export const Graph: VFC = memo(() => {
  const { isLogin } = useUserApi();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    isLogin()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title="食事グラフ">
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
        <Box
          as="article"
          h="100%"
          w="100%"
        >
          <GraphParamForm />
        </Box>
      </Flex>
    </HeaderLayout>
  );
});
