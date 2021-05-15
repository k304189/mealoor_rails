import { memo, VFC } from "react";
import { Checkbox, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

import { Stock } from "../../../types/api/stock";

type Props = {
  havingStocks: Array<Stock>;
  selectedStock: Stock | null;
  pagingDisplayNum: number;
  pagingOffset: number;
};

export const HavingStockTable: VFC<Props> = memo((props) => {
  const {
    havingStocks,
    selectedStock,
    pagingDisplayNum,
    pagingOffset,
  } = props;
  return (
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
        {havingStocks
          .slice(pagingOffset, pagingOffset + pagingDisplayNum)
          .map((data) => (
            <Tr key={data.id}>
              <Td>
                <Checkbox />
              </Td>
              <Td>{data.name}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>{data.category}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>{data.limit}</Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {data.price
                  ? `${data.price.toLocaleString()}円`
                  : ""}
              </Td>
              <Td display={{ base: "none", md: "table-cell" }}>
                {data.kcal
                  ? `${data.kcal.toLocaleString()}kcal`
                  : ""}
              </Td>
              <Td>{data.remain}<b>%</b></Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
});
