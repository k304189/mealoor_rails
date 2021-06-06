import { memo, VFC, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { CalendarTable } from "../../organisms/calendar/CalendarTable";
import { EatEditForm } from "../../organisms/eat/EatEditForm";

import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { useCalendarApi } from "../../../hooks/calendar/useCalendarApi";
import { useCalendar } from "../../../hooks/calendar/useCalendar";

export const Calendar: VFC = memo(() => {
  const {
    getFormatYearMonth,
    getCalendarArray,
    getCalendarStartDate,
    getCalendarEndDate,
  } = useCalendar();
  const { monthlySummary, getMonthlySummary } = useCalendarApi();

  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);
  const [displayYearMonth, setDisplayYearMonth] = useState(getFormatYearMonth(new Date()));
  const [monthlyCalendar, setMonthlyCalendar] = useState<Array<CalendarWeekType> | null>(null);

  useEffect(() => {
    const calendar = getCalendarArray(displayYearMonth);
    setMonthlyCalendar(calendar);
    if (calendar) {
      const startDate = getCalendarStartDate(calendar);
      const endDate = getCalendarEndDate(calendar);
      if (startDate && endDate) {
        getMonthlySummary(startDate, endDate);
      }
    }
  }, [displayYearMonth]);

  return (
    <SigninHeaderLayout title="カレンダー">
      <Box as="article" w="100%" h="100%">
        <CalendarTable
          displayYearMonth={displayYearMonth}
          setDisplayYearMonth={setDisplayYearMonth}
          monthlyCalendar={monthlyCalendar}
          monthlySummary={monthlySummary}
          openEditModal={() => { setEatEditFormIsOpen(true); }}
        />
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle="食事登録"
        size="4xl"
      >
        <EatEditForm monthlySummary={monthlySummary} />
      </DefaultModal>
    </SigninHeaderLayout>
  );
});
