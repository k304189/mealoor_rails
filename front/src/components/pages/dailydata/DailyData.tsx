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
    setBreakfastSummary,
    lunchSummary,
    setLunchSummary,
    dinnerSummary,
    setDinnerSummary,
    snackSummary,
    setSnackSummary,
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

  const calcEatSummary = (calcEats: Array<Eat> | null) => {
    const EAT_TIMING_ARRAY = [
      { eat_timing: "??????", setFunction: setBreakfastSummary },
      { eat_timing: "??????", setFunction: setLunchSummary },
      { eat_timing: "??????", setFunction: setDinnerSummary },
      { eat_timing: "??????", setFunction: setSnackSummary },
    ];

    if (calcEats) {
      EAT_TIMING_ARRAY.forEach((timing) => {
        const targetEats = calcEats.filter((data) => data.eat_timing === timing.eat_timing);
        let summaryKcal = 0;
        let summaryPrice = 0;
        if (targetEats.length > 0) {
          summaryKcal = targetEats.reduce((sum, element) => {
            return sum + (element.kcal ?? 0);
          }, 0);
          summaryPrice = targetEats.reduce((sum, element) => {
            return sum + (element.price ?? 0);
          }, 0);
        }
        timing.setFunction({ kcal: summaryKcal, price: summaryPrice });
      });
    }
  };

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
      calcEatSummary(tmpEatData);
    }
  };

  const openHealthEditModal = () => {
    let title = "";
    if (healthData) {
      title = "????????????";
    } else {
      title = "????????????";
    }
    setHealthEditFormTitle(title);
    setHealthEditFormIsOpen(true);
  };

  const openEatEditModal = (editMode = false) => {
    let title = "";
    if (editMode) {
      title = "????????????";
    } else {
      setEditEat(null);
      title = "????????????";
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
      showMessage({ title: "???????????????????????????????????????????????????????????????", status: "error" });
    }
  };

  const onClickDeleteButton = (id: number) => {
    if (eatData) {
      const targetEat = eatData.find((data) => data.id === id);
      if (targetEat) {
        setDeleteEatData(targetEat);
        setEatDeleteConfirmMessage(`??????????????? ${targetEat.eat_timing}???${targetEat.name}?????????????????????????????????????????????`);
        setEatDeleteDialogIsOpen(true);
      }
    }
  };

  const callDeleteEatData = () => {
    if (deleteEatData) {
      deleteEat(deleteEatData.id)
        .then(() => {
          showMessage({ title: "?????????????????????????????????????????????", status: "success" });
          if (eatData) {
            const tmpEatData = eatData;
            const index = tmpEatData.findIndex((data) => data.id === deleteEatData.id);
            if (index > -1) {
              tmpEatData.splice(index, 1);
              setEatData([...tmpEatData]);
              calcEatSummary(tmpEatData);
            }
          }
          setEatDeleteDialogIsOpen(false);
        })
        .catch(() => {
          showMessage({ title: "?????????????????????????????????????????????", status: "error" });
        });
    } else {
      showMessage({
        title: "???????????????????????????????????????????????????????????????????????????????????????????????????",
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
              showMessage({ title: "???????????????????????????????????????", status: "error" });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title={`????????????????????????${date}`} titleClass="dataSection">
      <Box as="article" w="100%" h="100%">
        <Flex h="100%">
          <Box w="55%">
            <HStack spacing={5}>
              <PrimaryButton onClick={history.goBack}>??????</PrimaryButton>
              <HealthButton onClick={openHealthEditModal} />
              <EatButton onClick={() => { openEatEditModal(false); }} />
            </HStack>
            <Box mt={6} className="sectionTitle">
              ?????????????????????
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
                  label="??????"
                  bg="#89C3ED"
                  todayKcal={breakfastSummary ? breakfastSummary.kcal : 0}
                  todayPrice={breakfastSummary ? breakfastSummary.price : 0}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="??????"
                  bg="#F7C114"
                  todayKcal={lunchSummary ? lunchSummary.kcal : 0}
                  todayPrice={lunchSummary ? lunchSummary.price : 0}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="??????"
                  bg="#EE827C"
                  todayKcal={dinnerSummary ? dinnerSummary.kcal : 0}
                  todayPrice={dinnerSummary ? dinnerSummary.price : 0}
                />
              </GridItem>
              <GridItem colSpan={1}>
                <EatSummaryCard
                  label="??????"
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
        headerTitle="???????????????????????????"
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
