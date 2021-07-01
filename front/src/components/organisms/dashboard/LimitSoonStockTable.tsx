import { memo, useState, VFC } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { Dashboard } from "../../../types/api/dashboard";

type Props = {
  dashboard: Dashboard | null;
};

export const LimitSoonStockTable: VFC<Props> = memo((props) => {
  const { dashboard } = props;
  const [pagingOffset, setPagingOffset] = useState(0);

  const stocks = dashboard ? dashboard.stock : [];

  const displayNum = 5;
  const onChangePage = (page: {selected: number}) =>
    setPagingOffset(displayNum * page.selected);

  return (
    <>
      { stocks && stocks.length > 0 ? (
        <>
          <Flex w="100%" justify="flex-end">
            <DefaultPaging
              displayNum={displayNum}
              dataNum={stocks.length}
              onPageChange={onChangePage}
            />
          </Flex>
          <Table size="sm">
            <Thead>
              <Tr>
                <Td>名前</Td>
                <Td>賞味期限</Td>
                <Td>量</Td>
                <Td>個数</Td>
                <Td>残量</Td>
              </Tr>
            </Thead>
            <Tbody>
              { stocks
                .slice(pagingOffset, pagingOffset + displayNum)
                .map((data) => (
                  <Tr>
                    <Td>{data.name}</Td>
                    <Td>{data.limit}</Td>
                    <Td>{data.amount || 0 }{data.unit || ""}</Td>
                    <Td>{data.quantity}コ</Td>
                    <Td>{data.remain}%</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <Box>賞味期限が近い食材はありません</Box>
      ) }
    </>
  );
});
