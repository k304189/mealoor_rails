import { memo, VFC, useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Td, Tr } from "@chakra-ui/react";

import { useCalendar } from "../../../hooks/common/useCalendar";
import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const Calendar: VFC = memo(() => {
  const [monthlyCalendar, setMonthlyCalendar] = useState<Array<CalendarWeekType>>();
  const { weekDayArray, getCalendarArray } = useCalendar();

  useEffect(() => {
    setMonthlyCalendar(getCalendarArray("2021-05"));
  }, []);

  return (
    <SigninHeaderLayout>
      <Box as="article" w="95%" h="95%">
        <h1>カレンダー画面です。</h1>
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
