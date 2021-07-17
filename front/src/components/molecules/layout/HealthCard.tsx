import { memo, useEffect, useState, VFC } from "react";
import { Table, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { Health } from "../../../types/api/health";

import { Card } from "../../atoms/layout/Card";

type Props = {
  todayHealth: Health | null;
  yesterdayHealth?: Health | null;
};

export const HealthCard: VFC<Props> = memo((props) => {
  const { todayHealth, yesterdayHealth = null } = props;
  const [todayWeight, setTodayWeight] = useState(0);
  const [todayFatPercent, setTodayFatPercent] = useState(0);
  const [todayFatWeight, setTodayFatWeight] = useState(0);
  const [yesterdayWeight, setYesterdayWeight] = useState(0);
  const [yesterdayFatPercent, setYesterdayFatPercent] = useState(0);
  const [yesterdayFatWeight, setYesterdayFatWeight] = useState(0);

  const bg = "#00B894";

  useEffect(() => {
    if (todayHealth) {
      setTodayWeight(todayHealth.weight);
      setTodayFatPercent(todayHealth.fat_percent || 0);
      setTodayFatWeight(todayHealth.fat_weight || 0);
    }

    if (yesterdayHealth) {
      setYesterdayWeight(yesterdayHealth.weight);
      setYesterdayFatPercent(yesterdayHealth.fat_percent || 0);
      setYesterdayFatWeight(yesterdayHealth.fat_weight || 0);
    }
  }, []);

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
          { yesterdayHealth ? (
            <Tr>
              <Td>昨日</Td>
              <Td>{yesterdayWeight.toLocaleString()}kg</Td>
              <Td>{yesterdayFatPercent.toLocaleString()}%</Td>
              <Td>{yesterdayFatWeight.toLocaleString()}kg</Td>
            </Tr>
          ) : (
            <Tr>
              <Td colSpan={4} />
            </Tr>
          )}
        </Tbody>
      </Table>
    </Card>
  );
});
