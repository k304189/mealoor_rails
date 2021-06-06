import { ChangeEvent, memo, VFC, useEffect, useState } from "react";
import { Box, Center, Grid, GridItem, Table, Thead, Tbody, Td, Tr } from "@chakra-ui/react";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { DefaultInput } from "../../atoms/input/DefaultInput";

import { useCalendar } from "../../../hooks/calendar/useCalendar";
import { useCalendarApi } from "../../../hooks/calendar/useCalendarApi";
import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";

type Props = {
  openEditModal: () => void;
};

export const CalendarTable: VFC<Props> = memo((props) => {
  const { openEditModal } = props;
  const { monthlySummary, getMonthlySummary } = useCalendarApi();
  const {
    weekDayArray,
    getFormatYearMonth,
    getCalendarArray,
    getCalendarStartDate,
    getCalendarEndDate,
  } = useCalendar();

  const [monthlyCalendar, setMonthlyCalendar] = useState<Array<CalendarWeekType>>();
  const [displayYearMonth, setDisplayYearMonth] = useState(getFormatYearMonth(new Date()));

  const getKcalFromMonthlySummary = (date: string):string | null => {
    const summary = monthlySummary.find((data) => data.date === date);
    let value:string | null = null;
    if (summary && summary.kcal) {
      value = `${summary.kcal.toLocaleString()}kcal`;
    }
    return value;
  };

  const getPriceFromMonthlySummary = (date: string):string | null => {
    const summary = monthlySummary.find((data) => data.date === date);
    let value:string | null = null;
    if (summary && summary.price) {
      value = `${summary.price.toLocaleString()}円`;
    }
    return value;
  };

  const onChangeDisplayYearMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayYearMonth(e.target.value);
  };

  const addDisplayYearMonth = (addMonth:number) => {
    const [year, month] = displayYearMonth.split("-").map(Number);
    setDisplayYearMonth(getFormatYearMonth(new Date(year, month + addMonth, 1)));
  };

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
    <>
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
          <GridItem>
            <PrimaryButton onClick={openEditModal}>食事登録</PrimaryButton>
          </GridItem>
        </Grid>
      </Box>
      {monthlyCalendar ? (
        <Table className="calendar" w="100%" h="90%">
          <Thead w="100%" h="4%">
            <Tr>
              {weekDayArray.map((day) => (
                <Td key={day} p={0} textAlign="center">
                  {day}
                </Td>
              ))}
            </Tr>
          </Thead>
          <Tbody w="100%" h="90%">
            {monthlyCalendar.map((week) => (
              <Tr key={week.weekNo} w="100%">
                {week.dateArray.map((date) => (
                  <Td
                    key={date.date}
                    p={0}
                    w="14%"
                    h="15%"
                    valign="top"
                    className={date.className}
                  >
                    <Grid
                      templateColumns="repeat(6, 1fr)"
                      gap={1}
                    >
                      <GridItem colSpan={6}>
                        <DefaultLink
                          tooltipText={`${date.date}の詳細画面`}
                          onClick={() => {}}
                        >
                          {Number(date.date.slice(-2))}
                        </DefaultLink>
                      </GridItem>
                      <GridItem colSpan={2}>
                        カロリー
                      </GridItem>
                      <GridItem colSpan={1}>
                        {getKcalFromMonthlySummary(date.date) || null}
                      </GridItem>
                      <GridItem colSpan={2}>
                        金額
                      </GridItem>
                      <GridItem colSpan={1}>
                        {getPriceFromMonthlySummary(date.date) || null}
                      </GridItem>
                    </Grid>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}
    </>
  );
});
