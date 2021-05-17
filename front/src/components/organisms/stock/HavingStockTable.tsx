import { memo, VFC } from "react";
import { Checkbox, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { Stock } from "../../../types/api/stock";

type Props = {
  havingStocks: Array<Stock>;
  pagingDisplayNum: number;
  pagingOffset: number;
  onClickNameLink: (id: number) => void;
};

export const HavingStockTable: VFC<Props> = memo((props) => {
  const {
    havingStocks,
    pagingDisplayNum,
    pagingOffset,
    onClickNameLink,
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
              <Td>
                <DefaultLink onClick={() => { onClickNameLink(data.id); }}>
                  {data.name}
                </DefaultLink>
              </Td>
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
