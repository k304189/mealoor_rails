import { memo, useState, VFC } from "react";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

const sampleStocks = [
  { id: 1, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 100, kcal: 300, remain: 100 },
];

export const StockList: VFC = memo(() => {
  const [stockList, setStockList] = useState(sampleStocks);
  return (
    <SigninHeaderLayout>
      <Flex className="main">
        <Box w="95%" h="100%">
          <Box as="article" w="100%">
            <Heading>
              食材一覧
            </Heading>
          </Box>
          <Box
            as="article"
            w="100%"
            h="100%"
            mt={5}
            px={4}
            py={4}
          >
            データ出力エリア
            <Table>
              <Thead>
                <Tr>
                  <Td>食材名</Td>
                  <Td>カテゴリー</Td>
                  <Td>賞味期限</Td>
                  <Td>価格</Td>
                  <Td>カロリー</Td>
                  <Td>残量（%）</Td>
                </Tr>
              </Thead>
              <Tbody>
                {stockList.map((data) => (
                  <Tr key={data.id}>
                    <Td>{data.name}</Td>
                    <Td>{data.category}</Td>
                    <Td>{data.limit}</Td>
                    <Td>{data.price}</Td>
                    <Td>{data.kcal}</Td>
                    <Td>{data.remain}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
