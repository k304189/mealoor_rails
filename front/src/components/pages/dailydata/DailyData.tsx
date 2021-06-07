import { memo, VFC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { EatTable } from "../../organisms/dailydata/EatTable";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { useMessage } from "../../../hooks/common/useMessage";
import { useDailyDataApi } from "../../../hooks/dailydata/useDailyDataApi";
import { Eat } from "../../../types/api/eat";

type UrlParams = {
  date: string;
};

export const DailyData: VFC = memo(() => {
  const { date } = useParams<UrlParams>();
  const { showMessage } = useMessage();
  const { getDailyData, breakfast, lunch, dinner, snack } = useDailyDataApi();

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
        <Box className="sectionTitle">
          食事
        </Box>
        <Grid
          templateColumns="repeat(8, 1fr)"
          gap={1}
        >
          <GridItem colSpan={4}>
            <EatTable label="朝食" eatData={breakfast} />
          </GridItem>
          <GridItem colSpan={4}>
            <EatTable label="昼食" eatData={lunch} />
          </GridItem>
          <GridItem colSpan={4}>
            <EatTable label="夕食" eatData={dinner} />
          </GridItem>
          <GridItem colSpan={4}>
            <EatTable label="間食" eatData={snack} />
          </GridItem>
        </Grid>
      </Box>
    </SigninHeaderLayout>
  );
});
