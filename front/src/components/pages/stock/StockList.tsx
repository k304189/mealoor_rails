import { memo, useState, VFC } from "react";
import {
  Box,
  Checkbox,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

const sampleStocks = [
  { id: 1, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 2, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 3, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 4, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 5, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 6, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 7, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 8, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 9, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 10, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 11, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 12, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 13, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 14, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 15, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 16, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 17, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 18, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 19, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 20, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
];

export const StockList: VFC = memo(() => {
  const [stockList, setStockList] = useState(sampleStocks);
  return (
    <SigninHeaderLayout>
      <Flex className="main">
        <Box w="95%" h="100%" overflow={{ base: "scroll", md: "auto" }}>
          <Box className="title">
            家にある食材
          </Box>
          <Box className="contents">
            <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
              <Box
                as="article"
                h="100%"
                w={{ base: "100%", md: "70%" }}
                mr={{ base: 0, md: 3 }}
                mb={{ base: 3, md: 0 }}
              >
                <Flex>
                  <PrimaryButton size="sm" onClick={() => {}}>食材追加</PrimaryButton>
                  <Spacer />
                  <DefaultPaging
                    displayNum={1}
                    dataNum={100}
                    onPageChange={(page: {selected: number}) => {}}
                  />
                </Flex>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Td>選択</Td>
                      <Td>食材名</Td>
                      <Td display={{ base: "none", md: "table-cell" }}>カテゴリー</Td>
                      <Td display={{ base: "none", md: "table-cell" }}>賞味期限</Td>
                      <Td display={{ base: "none", md: "table-cell" }}>価格</Td>
                      <Td display={{ base: "none", md: "table-cell" }}>カロリー</Td>
                      <Td>残量</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {stockList.map((data) => (
                      <Tr key={data.id}>
                        <Td>
                          <Checkbox />
                        </Td>
                        <Td>{data.name}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{data.category}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{data.limit}</Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{data.price.toLocaleString()}<b>円</b></Td>
                        <Td display={{ base: "none", md: "table-cell" }}>{data.kcal.toLocaleString()}<b>kcal</b></Td>
                        <Td>{data.remain}<b>%</b></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
              <Box
                as="article"
                h="100%"
                w={{ base: "100%", md: "30%" }}
              >
                選択中食材
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Td>食材名</Td>
                      <Td>残量</Td>
                      <Td>使用量</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {stockList.slice(0, 10).map((data) => (
                      <Tr key={data.id}>
                        <Td>{data.name}</Td>
                        <Td>{data.remain}<b>%</b></Td>
                        <Td>
                          <DefaultNumberInput
                            value={30}
                            onChange={() => {}}
                            size="xs"
                            max={100}
                            unit="%"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
