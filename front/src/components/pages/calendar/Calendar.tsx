import { memo, VFC, useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Td, Tr } from "@chakra-ui/react";

import { DefaultLink } from "../../atoms/button/DefaultLink";

import { useCalendar } from "../../../hooks/common/useCalendar";
import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const Calendar: VFC = memo(() => {
  const [monthlyCalendar, setMonthlyCalendar] = useState<Array<CalendarWeekType>>();
  const {
    weekDayArray,
    getFormatYearMonth,
    getCalendarArray,
  } = useCalendar();

  useEffect(() => {
    setMonthlyCalendar(getCalendarArray(getFormatYearMonth(new Date())));
  }, []);

  return (
    <SigninHeaderLayout title="カレンダー">
      <Box as="article" w="100%" h="100%">
        <Box h="10%">ボタンエリア</Box>
        {monthlyCalendar ? (
          <Table h="90%" className="calendar">
            <Thead h="4%">
              <Tr>
                {weekDayArray.map((day) => (
                  <Td key={day} textAlign="center">
                    {day}
                  </Td>
                ))}
              </Tr>
            </Thead>
            <Tbody h="90%">
              {monthlyCalendar.map((week) => (
                <Tr key={week.weekNo}>
                  {week.dateArray.map((date) => (
                    <Td key={date.date} valign="top" className={date.className}>
                      <DefaultLink
                        tooltipText={`${date.date}の詳細画面`}
                        onClick={() => {}}
                      >
                        {Number(date.date.slice(-2))}
                      </DefaultLink>
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <></>
        )}
      </Box>
    </SigninHeaderLayout>
  );
});
