import { useCallback } from "react";

import { CalendarWeekType } from "../../types/pages/calendar/calendarWeekType";

type returnType = {
  weekDayArray: Array<string>
  getFormatYearMonth: (targetDate: Date) => string;
  getCalendarArray: (yearMonth: string) => Array<CalendarWeekType>
}

export const useCalendar = (): returnType => {
  const dayNumSunday = 0;
  const dayNumSaturday = 6;
  const classNameSunday = "sunday";
  const classNameSaturday = "saturday";
  const classNameNotTargetMonth = "notTargetMonth";
  const calendarWeekNum = 6;
  const dateNumInWeek = 7;

  const weekDayArray = ["日", "月", "火", "水", "木", "金", "土"];

  const getClassName = (dayNum: number, isNotTargetMonth = false) => {
    const className: Array<string> = [];
    if (isNotTargetMonth) {
      className.push(classNameNotTargetMonth);
    } else if (dayNum === dayNumSunday) {
      className.push(classNameSunday);
    } else if (dayNum === dayNumSaturday) {
      className.push(classNameSaturday);
    }
    return className.join(" ");
  };

  const getFormatDateString = (date: Date) => {
    const splitedDate = date.toLocaleDateString("ja").split("/");
    const year = splitedDate[0];
    const month = `0${splitedDate[1]}`.slice(-2);
    const day = `0${splitedDate[2]}`.slice(-2);

    return `${year}-${month}-${day}`;
  };

  const getCalendarDate = (targetDate: Date, isNotTargetMonth = false) => {
    const date = getFormatDateString(targetDate);
    const dayNum = targetDate.getDay();
    const className = getClassName(dayNum, isNotTargetMonth);
    return { date, dayNum, className };
  };

  const getFormatYearMonth = (targetDate: Date) => {
    return getFormatDateString(targetDate).slice(0, -3);
  };

  const getCalendarArray = useCallback(
    (yearMonth: string): Array<CalendarWeekType> => {
      const [year, month] = yearMonth.split("-").map(Number);

      const thisMonthStartDate = new Date(year, month - 1, 1);
      const thisMonthStartDay = thisMonthStartDate.getDay();
      const thisMonthEndDate = new Date(year, month, 0);
      let thisMonthDateCount = 1;
      let nextMonthDateCount = 1;
      let prevMonthDateCount = -1 * (thisMonthStartDay - 1);

      const monthlyCalendar = [];

      for (let w = 0; w < calendarWeekNum; w += 1) {
        const dateArray = [];
        for (let d = 0; d < dateNumInWeek; d += 1) {
          let date: Date;
          let isNotTargetMonth = false;
          if (w === 0 && d < thisMonthStartDay) {
            date = new Date(year, month - 1, prevMonthDateCount);
            isNotTargetMonth = true;
            prevMonthDateCount += 1;
          } else if (thisMonthDateCount > thisMonthEndDate.getDate()) {
            date = new Date(year, month, nextMonthDateCount);
            isNotTargetMonth = true;
            nextMonthDateCount += 1;
          } else {
            date = new Date(year, month - 1, thisMonthDateCount);
            thisMonthDateCount += 1;
          }
          dateArray.push(getCalendarDate(date, isNotTargetMonth));
        }
        monthlyCalendar.push({ weekNo: w + 1, dateArray });
      }
      return monthlyCalendar;
    }, [],
  );
  return { weekDayArray, getFormatYearMonth, getCalendarArray };
};
