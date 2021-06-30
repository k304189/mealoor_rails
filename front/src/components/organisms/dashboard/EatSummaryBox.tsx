import { memo, VFC } from "react";
import { Box, Flex, Table, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

type Props = {
  bg?: string;
  color?: string;
  headerLabel: string;
  todayKcal: number;
  todayPrice: number;
  yesterdayKcal: number;
  yesterdayPrice: number;
};

export const EatSummaryBox: VFC<Props> = memo((props) => {
  const {
    bg = "#000000",
    color = "#FFFFFF",
    headerLabel,
    todayKcal,
    todayPrice,
    yesterdayKcal,
    yesterdayPrice,
  } = props;

  return (
    <Box bg={bg} color={color}>
      <Box p={2} w="100%" fontSize="2xl">
        <Flex align="center">
          <FontAwesomeIcon icon={faUtensils} />
          <Box ml={2}>
            {headerLabel}
          </Box>
        </Flex>
      </Box>
      <Table bg={bg} size="sm" variant="unstyled" align="right">
        <Thead>
          <Tr>
            <Td w="30%" />
            <Td w="35%">カロリー</Td>
            <Td w="35%">金額</Td>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td w="30%" fontSize="xl">本日</Td>
            <Td w="35%" fontSize="xl">{todayKcal.toLocaleString()}kcal</Td>
            <Td w="35%" fontSize="xl">{todayPrice.toLocaleString()}円</Td>
          </Tr>
          <Tr>
            <Td w="30%">昨日</Td>
            <Td w="35%" fontSize="xl">{yesterdayKcal.toLocaleString()}kcal</Td>
            <Td w="35%" fontSize="xl">{yesterdayPrice.toLocaleString()}円</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
});
