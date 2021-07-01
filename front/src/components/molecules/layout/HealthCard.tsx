import { memo, VFC } from "react";
import { Table, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";

import { Card } from "../../atoms/layout/Card";

type Props = {
  todayWeight: number;
  todayFatPercent: number;
  todayFatWeight: number;
  yesterdayWeight?: number | null;
  yesterdayFatPercent?: number | null;
  yesterdayFatWeight?: number | null;
};

export const HealthCard: VFC<Props> = memo((props) => {
  const {
    todayWeight,
    todayFatPercent,
    todayFatWeight,
    yesterdayWeight,
    yesterdayFatPercent,
    yesterdayFatWeight,
  } = props;

  const bg = "#00B894";

  return (
    <Card bg={bg} icon={faFileMedical} label="体調">
      <Table bg={bg} w="100%" size="sm" variant="unstyled" align="right">
        <Thead>
          <Tr>
            <Td w="28%" />
            <Td w="20%">体重</Td>
            <Td w="27%">体脂肪率</Td>
            <Td w="25%">体脂肪量</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize="xl">本日</Td>
            <Td fontSize="xl">{todayWeight.toLocaleString()}kg</Td>
            <Td fontSize="xl">{todayFatPercent.toLocaleString()}%</Td>
            <Td fontSize="xl">{todayFatWeight.toLocaleString()}kg</Td>
          </Tr>
          { yesterdayWeight && yesterdayFatPercent && yesterdayFatWeight ? (
            <Tr>
              <Td>昨日</Td>
              <Td>{yesterdayWeight.toLocaleString()}kg</Td>
              <Td>{yesterdayFatPercent.toLocaleString()}%</Td>
              <Td>{yesterdayFatWeight.toLocaleString()}kg</Td>
            </Tr>
          ) : (
            <></>
          )}
        </Tbody>
      </Table>
    </Card>
  );
});
