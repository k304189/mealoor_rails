import { memo, useState, VFC } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Spacer,
} from "@chakra-ui/react";

import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { Eat } from "../../../types/api/eat";

type Props = {
  label: string;
  eatData: Array<Eat> | null;
};

export const EatTable: VFC<Props> = memo((props) => {
  const { label, eatData } = props;

  const [pagingOffset, setPagingOffset] = useState(0);

  const pagingDisplayNum = 5;
  const onChangePaging = (page: {selected: number}) =>
    setPagingOffset(pagingDisplayNum * page.selected);

  return (
    <>
      { (eatData && eatData.length > 0) ? (
        <>
          <Flex>
            <Box className="sectionTitle">
              {label}
            </Box>
            <Spacer />
            <DefaultPaging
              displayNum={pagingDisplayNum}
              dataNum={eatData.length}
              onPageChange={onChangePaging}
            />
          </Flex>
          <Table size="sm">
            <Thead>
              <Tr>
                <Td>料理名</Td>
                <Td>カテゴリー</Td>
                <Td>食事タイプ</Td>
                <Td>値段</Td>
                <Td>カロリー</Td>
                <Td>店</Td>
              </Tr>
            </Thead>
            <Tbody>
              {eatData
                .slice(pagingOffset, pagingOffset + pagingDisplayNum)
                .map((data) => (
                  <Tr key={data.id}>
                    <Td>{data.name}</Td>
                    <Td>{data.category}</Td>
                    <Td>{data.eat_type}</Td>
                    <Td>
                      {data.price
                        ? `${data.price.toLocaleString()}円`
                        : ""}
                    </Td>
                    <Td>
                      {data.kcal
                        ? `${data.kcal.toLocaleString()}kcal`
                        : ""}
                    </Td>
                    <Td>{data.shop}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <Box>{label}の食事データはありません</Box>
      ) }
    </>
  );
});
