import { memo, VFC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { EatDataArea } from "../../organisms/dailydata/EatDataArea";
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
  const { getDailyData, eatData, setEatData } = useDailyDataApi();

  const [loading, setLoading] = useState(false);
  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);

  const addEatDataToDailyData = (eat: Eat) => {
    if (eatData) {
      setEatData([...eatData, eat]);
    }
  };

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
        <EatDataArea eatData={eatData} openEditModal={() => { setEatEditFormIsOpen(true); }} />
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle="食事登録"
        size="4xl"
      >
        <EatEditForm setEatData={addEatDataToDailyData} />
      </DefaultModal>
    </SigninHeaderLayout>
  );
});
