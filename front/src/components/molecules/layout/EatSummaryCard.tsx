import { memo, VFC } from "react";
import { Table, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import { Card } from "../../atoms/layout/Card";

type Props = {
  todayKcal: number;
  todayPrice: number;
  yesterdayKcal?: number | null;
  yesterdayPrice?: number | null;
};

export const EatSummaryCard: VFC<Props> = memo((props) => {
  const {
    todayKcal,
    todayPrice,
    yesterdayKcal,
    yesterdayPrice,
  } = props;

  const bg = "#FF8800";

  return (
    <Card bg={bg} icon={faUtensils} label="食事">
      <Table bg={bg} w="100%" size="sm" variant="unstyled" align="right">
        <Thead>
          <Tr>
            <Td w="30%" />
            <Td w="35%">カロリー</Td>
            <Td w="35%">金額</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td fontSize="xl">本日</Td>
            <Td fontSize="xl">{todayKcal.toLocaleString()}kcal</Td>
            <Td fontSize="xl">{todayPrice.toLocaleString()}円</Td>
          </Tr>
          { yesterdayKcal && yesterdayPrice ? (
            <Tr>
              <Td>昨日</Td>
              <Td>{yesterdayKcal.toLocaleString()}kcal</Td>
              <Td>{yesterdayPrice.toLocaleString()}円</Td>
            </Tr>
          ) : (
            <></>
          )}
        </Tbody>
      </Table>
    </Card>
  );
});
