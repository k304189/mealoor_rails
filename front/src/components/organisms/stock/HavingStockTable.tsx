import { ChangeEvent, memo, useState, VFC } from "react";
import {
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
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultCheckbox } from "../../atoms/button/DefaultCheckbox";
import { Stock } from "../../../types/api/stock";

type Props = {
  havingStocks: Array<Stock>;
  checkedList: Array<number>;
  openEditModal: () => void;
  onClickNameLink: (id: number) => void;
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
};

export const HavingStockTable: VFC<Props> = memo((props) => {
  const [havingPagingOffset, setHavingPagingOffset] = useState(0);
  const {
    havingStocks,
    checkedList,
    openEditModal,
    onClickNameLink,
    onChangeCheckbox,
  } = props;

  const havingPagingDisplayNum = 10;
  const onChangeHavingPage = (page: {selected: number}) =>
    setHavingPagingOffset(havingPagingDisplayNum * page.selected);

  return (
    <>
      <Flex>
        <PrimaryButton size="sm" onClick={() => { openEditModal(); }}>食材追加</PrimaryButton>
        <Spacer />
        <DefaultPaging
          displayNum={havingPagingDisplayNum}
          dataNum={havingStocks.length}
          onPageChange={onChangeHavingPage}
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
          {havingStocks
            .slice(havingPagingOffset, havingPagingOffset + havingPagingDisplayNum)
            .map((data) => (
              <Tr key={data.id}>
                <Td>
                  <DefaultCheckbox
                    isChecked={checkedList.includes(data.id)}
                    onChange={(e) => { onChangeCheckbox(e, data.id); }}
                  />
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
    </>
  );
});
