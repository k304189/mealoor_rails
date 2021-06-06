import { memo, VFC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { useMessage } from "../../../hooks/common/useMessage";
import { useDailyDataApi } from "../../../hooks/dailydata/useDailyDataApi";

type UrlParams = {
  date: string;
};

export const DailyData: VFC = memo(() => {
  const { date } = useParams<UrlParams>();
  const { showMessage } = useMessage();
  const { getDailyData } = useDailyDataApi();

  useEffect(() => {
    getDailyData(date)
      .catch(() => {
        showMessage({ title: "データの取得に失敗しました", status: "error" });
      });
  }, []);

  return (
    <SigninHeaderLayout title={`デイリーデータ：${date}`}>
      <Box as="article" w="100%" h="100%">
        デイリーデータの画面
      </Box>
    </SigninHeaderLayout>
  );
});
