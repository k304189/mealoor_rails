import { memo, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Grid, GridItem, Table, Thead, Tbody, Td, Tr } from "@chakra-ui/react";
import {
  faWeight,
  faPercent,
  faHandHoldingUsd,
  faDrumstickBite,
} from "@fortawesome/free-solid-svg-icons";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultFontIcon } from "../../atoms/icon/DefaultFontIcon";

import { useCalendar } from "../../../hooks/calendar/useCalendar";
import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { MonthlySummary } from "../../../types/api/monthlySummary";

type Props = {
  monthlyCalendar: Array<CalendarWeekType> | null;
  monthlySummary: Array<MonthlySummary> | null;
};

export const CalendarTable: VFC<Props> = memo((props) => {
  const history = useHistory();
  const {
    monthlyCalendar,
    monthlySummary,
  } = props;

  const {
    weekDayArray,
  } = useCalendar();

  const getKcalFromMonthlySummary = (date: string):string | null => {
    let value:string | null = null;
    if (monthlySummary) {
      const summary = monthlySummary.find((data) => data.date === date);
      if (summary && summary.kcal) {
        value = `${summary.kcal.toLocaleString()}kcal`;
      }
    }
    return value;
  };

  const getPriceFromMonthlySummary = (date: string):string | null => {
    let value:string | null = null;
    if (monthlySummary) {
      const summary = monthlySummary.find((data) => data.date === date);
      if (summary && summary.price) {
        value = `${summary.price.toLocaleString()}円`;
      }
    }
    return value;
  };

  const getWeightFromMonthlySummary = (date: string):string | null => {
    let value:string | null = null;
    if (monthlySummary) {
      const summary = monthlySummary.find((data) => data.date === date);
      if (summary && summary.weight) {
        value = `${summary.weight}kg`;
      }
    }
    return value;
  };

  const getFatPercentFromMonthlySummary = (date: string):string | null => {
    let value:string | null = null;
    if (monthlySummary) {
      const summary = monthlySummary.find((data) => data.date === date);
      if (summary && summary.fat_percent) {
        value = `${summary.fat_percent}%`;
      }
    }
    return value;
  };

  const onClickDateLink = (date: string) => {
    history.push(`/dailydata/${date}`);
  };

  return (
    <>
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
                    px={1}
                    py={0}
                    w="14%"
                    h="15%"
                    valign="top"
                    className={date.className}
                  >
                    <Grid
                      templateColumns="repeat(8, 1fr)"
                      gap={1}
                    >
                      <GridItem colSpan={8}>
                        <DefaultLink
                          tooltipText={`${date.date}の詳細画面`}
                          onClick={() => { onClickDateLink(date.date); }}
                        >
                          {Number(date.date.slice(-2))}
                        </DefaultLink>
                      </GridItem>
                      <GridItem colSpan={1}>
                        <DefaultFontIcon
                          icon={faWeight}
                          tooltipText="体重"
                          color="teal.400"
                        />
                      </GridItem>
                      <GridItem colSpan={3}>
                        {getWeightFromMonthlySummary(date.date) || null}
                      </GridItem>
                      <GridItem colSpan={1}>
                        <DefaultFontIcon
                          icon={faPercent}
                          tooltipText="体脂肪率"
                          color="cyan.400"
                        />
                      </GridItem>
                      <GridItem colSpan={3}>
                        {getFatPercentFromMonthlySummary(date.date) || null}
                      </GridItem>
                      <GridItem colSpan={1}>
                        <DefaultFontIcon
                          icon={faDrumstickBite}
                          tooltipText="摂取カロリー"
                          color="orange.300"
                        />
                      </GridItem>
                      <GridItem colSpan={3}>
                        {getKcalFromMonthlySummary(date.date) || null}
                      </GridItem>
                      <GridItem colSpan={1}>
                        <DefaultFontIcon
                          icon={faHandHoldingUsd}
                          tooltipText="食費"
                          color="yellow.400"
                        />
                      </GridItem>
                      <GridItem colSpan={3}>
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
