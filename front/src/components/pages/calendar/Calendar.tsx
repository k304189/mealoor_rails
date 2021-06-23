import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { EatButton } from "../../molecules/button/EatButton";
import { HealthButton } from "../../molecules/button/HealthButton";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { CalendarTable } from "../../organisms/calendar/CalendarTable";
import { EatEditForm } from "../../organisms/eat/EatEditForm";
import { HealthEditForm } from "../../organisms/health/HealthEditForm";

import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { Eat } from "../../../types/api/eat";
import { Health } from "../../../types/api/health";
import { useMessage } from "../../../hooks/common/useMessage";
import { useCalendarApi } from "../../../hooks/calendar/useCalendarApi";
import { useCalendar } from "../../../hooks/calendar/useCalendar";

export const Calendar: VFC = memo(() => {
  const {
    getFormatYearMonth,
    getCalendarArray,
    getCalendarStartDate,
    getCalendarEndDate,
  } = useCalendar();
  const { monthlySummary, getMonthlySummary, setMonthlySummary } = useCalendarApi();
  const { showMessage } = useMessage();

  const [loading, setLoading] = useState(false);
  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);
  const [healthEditFormIsOpen, setHealthEditFormIsOpen] = useState(false);
  const [displayYearMonth, setDisplayYearMonth] = useState(getFormatYearMonth(new Date()));
  const [monthlyCalendar, setMonthlyCalendar] = useState<Array<CalendarWeekType> | null>(null);

  const onChangeDisplayYearMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayYearMonth(e.target.value);
  };

  const addDisplayYearMonth = (addMonth:number) => {
    const [year, month] = displayYearMonth.split("-").map(Number);
    setDisplayYearMonth(getFormatYearMonth(new Date(year, month + addMonth, 1)));
  };

  const addEatDataToCalendar = (eat: Eat) => {
    const tmpMonthlySummary = [...monthlySummary];
    const targetIndex = tmpMonthlySummary.findIndex((data) => data.date === eat.eat_date);
    if (targetIndex > -1) {
      const targetSummary = tmpMonthlySummary[targetIndex];
      if (targetSummary) {
        targetSummary.kcal = (targetSummary.kcal ?? 0) + (eat.kcal ?? 0);
        targetSummary.price = (targetSummary.price ?? 0) + (eat.price ?? 0);
        tmpMonthlySummary[targetIndex] = targetSummary;
      }
    } else {
      tmpMonthlySummary.push({
        date: eat.eat_date,
        kcal: eat.kcal ?? 0,
        price: eat.price ?? 0,
      });
    }
    setMonthlySummary([...tmpMonthlySummary]);
  };

  const setHealthData = (health: Health) => {
    const tmpMonthlySummary = [...monthlySummary];
    const targetIndex = tmpMonthlySummary.findIndex((data) => data.date === health.recording_date);
    if (targetIndex > -1) {
      const targetSummary = tmpMonthlySummary[targetIndex];
      if (targetSummary) {
        targetSummary.weight = health.weight;
        targetSummary.fat_percent = health.fat_percent;
        tmpMonthlySummary[targetIndex] = targetSummary;
      }
    } else {
      tmpMonthlySummary.push({
        date: health.recording_date,
        weight: health.weight ?? 0,
        fat_percent: health.fat_percent ?? 0,
      });
    }
    setMonthlySummary([...tmpMonthlySummary]);
  };

  useEffect(() => {
    const calendar = getCalendarArray(displayYearMonth);
    setMonthlyCalendar(calendar);
    if (calendar) {
      const startDate = getCalendarStartDate(calendar);
      const endDate = getCalendarEndDate(calendar);
      if (startDate && endDate) {
        setLoading(true);
        getMonthlySummary(startDate, endDate)
          .catch(() => {
            showMessage({ title: "日々のデータの取得に失敗しました", status: "error" });
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, [displayYearMonth]);

  return (
    <HeaderLayout loading={loading} title="カレンダー">
      <Box as="article" w="100%" h="100%">
        <Box h="10%">
          <Grid
            templateColumns="repeat(14, 1fr)"
            gap={1}
          >
            <GridItem colSpan={1}>
              <Center h="100%">表示月</Center>
            </GridItem>
            <GridItem colSpan={1}>
              <DefaultInput
                type="month"
                value={displayYearMonth}
                onChange={onChangeDisplayYearMonth}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <SecondaryButton onClick={() => { addDisplayYearMonth(-2); }}>
                先月
              </SecondaryButton>
              <SecondaryButton onClick={() => { addDisplayYearMonth(0); }}>
                翌月
              </SecondaryButton>
            </GridItem>
            <GridItem colSpan={1}>
              <HealthButton onClick={() => { setHealthEditFormIsOpen(true); }} />
            </GridItem>
            <GridItem colSpan={1}>
              <EatButton onClick={() => { setEatEditFormIsOpen(true); }} />
            </GridItem>
          </Grid>
        </Box>
        <CalendarTable
          monthlyCalendar={monthlyCalendar}
          monthlySummary={monthlySummary}
        />
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle="食事登録"
        size="4xl"
      >
        <EatEditForm setEatData={addEatDataToCalendar} />
      </DefaultModal>
      <DefaultModal
        isOpen={healthEditFormIsOpen}
        onClose={() => { setHealthEditFormIsOpen(false); }}
        modalTitle="体調登録"
        size="2xl"
      >
        <HealthEditForm setHealthData={setHealthData} />
      </DefaultModal>
    </HeaderLayout>
  );
});
