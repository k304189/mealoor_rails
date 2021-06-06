import { memo, VFC } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

type UrlParams = {
  date: string;
};

export const DailyData: VFC = memo(() => {
  const { date } = useParams<UrlParams>();
  return (
    <SigninHeaderLayout title={`デイリーデータ：${date}`}>
      <Box as="article" w="100%" h="100%">
        デイリーデータの画面
      </Box>
    </SigninHeaderLayout>
  );
});
