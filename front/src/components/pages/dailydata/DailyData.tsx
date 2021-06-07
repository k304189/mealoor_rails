import { memo, VFC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { EatTable } from "../../organisms/dailydata/EatTable";
import { EatEditForm } from "../../organisms/eat/EatEditForm";
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
  const { getDailyData, eatData } = useDailyDataApi();

  const [loading, setLoading] = useState(false);
  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDailyData(date)
      .catch(() => {
        showMessage({ title: "データの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SigninHeaderLayout loading={loading} title={`デイリーデータ：${date}`}>
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
            <EatTable eatTiming="朝食" eatData={eatData} />
          </GridItem>
          <GridItem colSpan={4}>
            <EatTable eatTiming="昼食" eatData={eatData} />
          </GridItem>
          <GridItem colSpan={4}>
            <EatTable eatTiming="夕食" eatData={eatData} />
          </GridItem>
          <GridItem colSpan={4}>
            <EatTable eatTiming="間食" eatData={eatData} />
          </GridItem>
        </Grid>
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle="食事登録"
        size="4xl"
      >
        <EatEditForm />
      </DefaultModal>
    </SigninHeaderLayout>
  );
});
