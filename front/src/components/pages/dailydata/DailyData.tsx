import { memo, VFC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Flex, Grid, GridItem, HStack, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { EatButton } from "../../molecules/button/EatButton";
import { HealthButton } from "../../molecules/button/HealthButton";
import { HealthCard } from "../../molecules/layout/HealthCard";
import { EatSummaryCard } from "../../molecules/layout/EatSummaryCard";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { DefaultDialog } from "../../molecules/layout/DefaultDialog";
import { EatDataArea } from "../../organisms/dailydata/EatDataArea";
import { EatEditForm } from "../../organisms/eat/EatEditForm";
import { HealthEditForm } from "../../organisms/health/HealthEditForm";
import { HeaderLayout } from "../../templates/HeaderLayout";
import { useMessage } from "../../../hooks/common/useMessage";
import { useDailyDataApi } from "../../../hooks/dailydata/useDailyDataApi";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useEatApi } from "../../../hooks/eat/useEatApi";
import { Eat } from "../../../types/api/eat";

type UrlParams = {
  date: string;
};

export const DailyData: VFC = memo(() => {
  const { date } = useParams<UrlParams>();
  const history = useHistory();
  const { showMessage } = useMessage();
  const {
    getDailyData,
    eatData,
    setEatData,
    healthData,
    setHealthData,
    breakfastSummary,
    lunchSummary,
    dinnerSummary,
    snackSummary,
  } = useDailyDataApi();
  const { deleteEat } = useEatApi();
  const { isLogin } = useUserApi();

  const [loading, setLoading] = useState(false);
  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);
  const [eatDeleteDialogIsOpen, setEatDeleteDialogIsOpen] = useState(false);
  const [editEat, setEditEat] = useState<Eat | null>(null);
  const [deleteEatData, setDeleteEatData] = useState<Eat | null>(null);
  const [eatEditFormTitle, setEatEditFormTitle] = useState("");
  const [eatDeleteConfirmMessage, setEatDeleteConfirmMessage] = useState("");

  const [healthEditFormIsOpen, setHealthEditFormIsOpen] = useState(false);
  const [healthEditFormTitle, setHealthEditFormTitle] = useState("");

  const updateEatDataInDailyData = (eat: Eat) => {
    if (eat.eat_date === date && eatData) {
      const tmpEatData = [...eatData];
      const index = tmpEatData.findIndex((data) => data.id === eat.id);
      if (index > -1) {
        tmpEatData[index] = eat;
      } else {
        tmpEatData.push(eat);
      }
      setEatData([...tmpEatData]);
      setEditEat(eat);
    }
  };

  const openHealthEditModal = () => {
    let title = "";
    if (healthData) {
      title = "体調編集";
    } else {
      title = "体調登録";
    }
    setHealthEditFormTitle(title);
    setHealthEditFormIsOpen(true);
  };

  const openEatEditModal = (editMode = false) => {
    let title = "";
    if (editMode) {
      title = "食事編集";
    } else {
      setEditEat(null);
      title = "食事登録";
    }
    setEatEditFormTitle(title);
    setEatEditFormIsOpen(true);
  };

  const onClickEatNameLink = (id = 0) => {
    if (eatData) {
      const index = eatData.findIndex((data) => data.id === id);
      let selectedEat: Eat | null = null;
      let editMode = false;
      if (index > -1) {
        selectedEat = eatData[index];
        editMode = true;
      }
      setEditEat(selectedEat);
      openEatEditModal(editMode);
    } else {
      showMessage({ title: "選択された食事データを開くことができません", status: "error" });
    }
  };

  const onClickDeleteButton = (id: number) => {
    if (eatData) {
      const targetEat = eatData.find((data) => data.id === id);
      if (targetEat) {
        setDeleteEatData(targetEat);
        setEatDeleteConfirmMessage(`食事データ ${targetEat.eat_timing}の${targetEat.name}を削除します。よろしいですか？`);
        setEatDeleteDialogIsOpen(true);
      }
    }
  };

  const callDeleteEatData = () => {
    if (deleteEatData) {
      deleteEat(deleteEatData.id)
        .then(() => {
          showMessage({ title: "食事データの削除に成功しました", status: "success" });
          if (eatData) {
            const tmpEatData = eatData;
            const index = tmpEatData.findIndex((data) => data.id === deleteEatData.id);
            if (index > -1) {
              tmpEatData.splice(index, 1);
              setEatData([...tmpEatData]);
            }
          }
          setEatDeleteDialogIsOpen(false);
        })
        .catch(() => {
          showMessage({ title: "食事データの削除に失敗しました", status: "error" });
        });
    } else {
      showMessage({
        title: "選択した食事データが削除できません。管理者に問い合わせしてください",
        status: "error",
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    isLogin()
      .then((result) => {
        if (result) {
          getDailyData(date)
            .catch(() => {
              showMessage({ title: "データの取得に失敗しました", status: "error" });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title={`デイリーデータ：${date}`} titleClass="dataSection">
      <Box as="article" w="100%" h="100%">
        <Flex h="100%">
          <Box w="55%">
            <HStack spacing={5}>
              <PrimaryButton onClick={history.goBack}>戻る</PrimaryButton>
              <HealthButton onClick={openHealthEditModal} />
              <EatButton onClick={() => { openEatEditModal(false); }} />
            </HStack>
            <Box mt={6} className="sectionTitle">
              データサマリー
            </Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={2} p={1}>
              <GridItem colSpan={1}>
                <HealthCard todayHealth={healthData} />
              </GridItem>
              <GridItem colSpan={1}>
                <></>
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="朝食"
                  bg="#89C3ED"
                  todayKcal={breakfastSummary ? breakfastSummary.kcal : 0}
                  todayPrice={breakfastSummary ? breakfastSummary.price : 0}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="昼食"
                  bg="#F7C114"
                  todayKcal={lunchSummary ? lunchSummary.kcal : 0}
                  todayPrice={lunchSummary ? lunchSummary.price : 0}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="夕食"
                  bg="#EE827C"
                  todayKcal={dinnerSummary ? dinnerSummary.kcal : 0}
                  todayPrice={dinnerSummary ? dinnerSummary.price : 0}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="間食"
                  bg="#68BE8D"
                  todayKcal={snackSummary ? snackSummary.kcal : 0}
                  todayPrice={snackSummary ? snackSummary.price : 0}
                />
              </GridItem>
            </Grid>
          </Box>
          <Box w="45%">
            <VStack spacing={4}>
              <EatDataArea
                eatData={eatData}
                onClickEatNameLink={onClickEatNameLink}
                onClickDeleteButton={onClickDeleteButton}
              />
            </VStack>
          </Box>
        </Flex>
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle={eatEditFormTitle}
        size="4xl"
      >
        <EatEditForm
          eat={editEat}
          initialEatDate={date}
          setEatData={updateEatDataInDailyData}
        />
      </DefaultModal>
      <DefaultDialog
        isOpen={eatDeleteDialogIsOpen}
        headerTitle="食事データ削除確認"
        onClose={() => { setEatDeleteDialogIsOpen(false); }}
        onClick={callDeleteEatData}
      >
        {eatDeleteConfirmMessage}
      </DefaultDialog>
      <DefaultModal
        isOpen={healthEditFormIsOpen}
        onClose={() => { setHealthEditFormIsOpen(false); }}
        modalTitle={healthEditFormTitle}
        size="2xl"
      >
        <HealthEditForm
          health={healthData}
          initialRecordingDate={date}
          setHealthData={setHealthData}
        />
      </DefaultModal>
    </HeaderLayout>
  );
});
