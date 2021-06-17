import { ChangeEvent, memo, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Center, Grid, GridItem, Table, Thead, Tbody, Td, Tr } from "@chakra-ui/react";
import {
  faHandHoldingUsd,
  faDrumstickBite,
} from "@fortawesome/free-solid-svg-icons";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultFontIcon } from "../../atoms/icon/DefaultFontIcon";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { EatButton } from "../../molecules/button/EatButton";
import { HealthButton } from "../../molecules/button/HealthButton";

import { useCalendar } from "../../../hooks/calendar/useCalendar";
import { CalendarWeekType } from "../../../types/pages/calendar/calendarWeekType";
import { MonthlySummary } from "../../../types/api/monthlySummary";

type Props = {
  displayYearMonth: string;
  setDisplayYearMonth: (displayYearMonth: string) => void;
  monthlyCalendar: Array<CalendarWeekType> | null;
  monthlySummary: Array<MonthlySummary> | null;
  openEditModal: () => void;
};

export const CalendarTable: VFC<Props> = memo((props) => {
  const history = useHistory();
  const {
    displayYearMonth,
    setDisplayYearMonth,
    monthlyCalendar,
    monthlySummary,
    openEditModal,
  } = props;

  const {
    weekDayArray,
    getFormatYearMonth,
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

  const onChangeDisplayYearMonth = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayYearMonth(e.target.value);
  };

  const addDisplayYearMonth = (addMonth:number) => {
    const [year, month] = displayYearMonth.split("-").map(Number);
    setDisplayYearMonth(getFormatYearMonth(new Date(year, month + addMonth, 1)));
  };

  const onClickDateLink = (date: string) => {
    history.push(`/dailydata/${date}`);
  };

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
          <GridItem colspan={1}>
            <HealthButton onClick={() => {}} />
          </GridItem>
          <GridItem colspan={1}>
            <EatButton onClick={openEditModal} />
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
