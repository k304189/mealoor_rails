import { memo, VFC, useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Td, Tr } from "@chakra-ui/react";

import { useCalendar } from "../../../hooks/common/useCalendar";
import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const Calendar: VFC = memo(() => {
  const [monthlyCalendar, setMonthlyCalendar] = useState<Array<CalendarWeekType>>();
  const { weekDayArray, getFormatYearMonth, getCalendarArray } = useCalendar();

  useEffect(() => {
    setMonthlyCalendar(getCalendarArray(getFormatYearMonth(new Date())));
  }, []);

  return (
    <SigninHeaderLayout title="カレンダー">
      <Box as="article" w="100%" h="100%">
        {monthlyCalendar ? (
          <Table>
            <Thead>
              <Tr>
                {weekDayArray.map((day) => (
                  <Td key={day}>{day}</Td>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {monthlyCalendar.map((week) => (
                <Tr key={week.weekNo}>
                  {week.dateArray.map((date) => (
                    <Td key={date.date}>{date.date}</Td>
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
