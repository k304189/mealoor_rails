import { useCallback } from "react";

import { CalendarWeekType } from "../../types/pages/calendar/calendarWeekType";

type returnType = {
  weekDayArray: Array<string>
  getCalendarArray: (yearMonth: string) => Array<CalendarWeekType>
}

export const useCalendar = (): returnType => {
  const weekDayArray = ["日", "月", "火", "水", "木", "金", "土"];
  const calendarWeekNum = 6;
  const dateNumInWeek = 7;

  const getCalendarDate = (date: string, dayNum: number) => {
    return { date, dayNum };
  };

  const getFormatDateString = (date: Date) => {
    const splitedDate = date.toLocaleDateString("ja").split("/");
    const year = splitedDate[0];
    const month = `0${splitedDate[1]}`.slice(-2);
    const day = `0${splitedDate[2]}`.slice(-2);

    return `${year}-${month}-${day}`;
  };

  const getCalendarArray = useCallback(
    (yearMonth: string): Array<CalendarWeekType> => {
      const param = yearMonth.split("-").map(Number);
      const startDate = new Date(param[0], param[1] - 1, 1);
      const startDay = startDate.getDay();
      const endDate = new Date(param[0], param[1], 0);

      let dateCount = 1;
      const monthlyCalendar = [];

      for (let w = 0; w < calendarWeekNum; w += 1) {
        const dateArray = [];
        for (let d = 0; d < dateNumInWeek; d += 1) {
          if (w === 0 && d < startDay) {
            dateArray.push(getCalendarDate("", d));
          } else if (dateCount > endDate.getDate()) {
            dateArray.push(getCalendarDate("", d));
          } else {
            dateArray.push(
              getCalendarDate(getFormatDateString(startDate), startDate.getDay()),
            );
            dateCount = startDate.getDate() + 1;
            startDate.setDate(dateCount);
          }
        }
        monthlyCalendar.push({ weekNo: w + 1, dateArray });
      }
      return monthlyCalendar;
    }, [],
  );
  return { weekDayArray, getCalendarArray };
};
