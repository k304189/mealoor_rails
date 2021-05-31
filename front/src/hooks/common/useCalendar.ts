import { useCallback } from "react";

type CalendarArrayType = {
  date: string;
  weekNum: number;
}

type returnType = {
  weekDayArray: Array<string>
  getCalendarArray: (yearMonth: string) => Array<Array<CalendarArrayType>>
}

export const useCalendar = (): returnType => {
  const weekDayArray = ["日", "月", "火", "水", "木", "金", "土"];

  const getFormatDateString = (date: Date) => {
    const splitedDate = date.toLocaleDateString("ja").split("/");
    const year = splitedDate[0];
    const month = `0${splitedDate[1]}`.slice(-2);
    const day = `0${splitedDate[2]}`.slice(-2);

    return `${year}-${month}-${day}`;
  };

  const getCalendarArray = useCallback(
    (yearMonth: string): Array<Array<CalendarArrayType>> => {
      const param = yearMonth.split("-").map(Number);
      const startDate = new Date(param[0], param[1] - 1, 1);
      const startDay = startDate.getDay();
      const endDate = new Date(param[0], param[1], 0);

      let dateCount = 1;
      const monthlyCalendar = [];

      for (let w = 0; w < 6; w += 1) {
        const weekArray = [];
        for (let d = 0; d < 7; d += 1) {
          if (w === 0 && d < startDay) {
            weekArray.push({ date: "", weekNum: d });
          } else if (dateCount > endDate.getDate()) {
            weekArray.push({ date: "", weekNum: d });
          } else {
            weekArray.push({
              date: getFormatDateString(startDate),
              weekNum: startDate.getDay(),
            });
            dateCount = startDate.getDate() + 1;
            startDate.setDate(dateCount);
          }
        }
        monthlyCalendar.push(weekArray);
      }
      return monthlyCalendar;
    }, [],
  );
  return { weekDayArray, getCalendarArray };
};
