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
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DeleteButton } from "../../molecules/button/DeleteButton";
import { Eat } from "../../../types/api/eat";

type Props = {
  eatData: Array<Eat> | null;
  onClickEatNameLink: (id: number) => void;
  onClickDeleteButton: (id: number) => void;
};

export const EatDataArea: VFC<Props> = memo((props) => {
  const { eatData, onClickEatNameLink, onClickDeleteButton } = props;
  const [pagingOffset, setPagingOffset] = useState(0);

  const pagingDisplayNum = 5;
  const onChangePaging = (page: {selected: number}) =>
    setPagingOffset(pagingDisplayNum * page.selected);

  return (
    <Box>
      <Flex>
        <Box className="sectionTitle">
          食事
        </Box>
        <Spacer />
        <DefaultPaging
          displayNum={pagingDisplayNum}
          dataNum={eatData ? eatData.length : 0}
          onPageChange={onChangePaging}
        />
      </Flex>
      { (eatData && eatData.length > 0) ? (
        <Table size="sm">
          <Thead>
            <Tr>
              <Td>料理名</Td>
              <Td>カテゴリー</Td>
              <Td>食事タイミング</Td>
              <Td>食事タイプ</Td>
              <Td>値段</Td>
              <Td>カロリー</Td>
            </Tr>
          </Thead>
          <Tbody>
            {eatData
              .slice(pagingOffset, pagingOffset + pagingDisplayNum)
              .map((data) => (
                <Tr key={data.id}>
                  <Td>
                    <DefaultLink onClick={() => { onClickEatNameLink(data.id); }}>
                      {data.name}
                    </DefaultLink>
                  </Td>
                  <Td>{data.category}</Td>
                  <Td>{data.eat_timing}</Td>
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
                  <Td>
                    <DeleteButton
                      tooltipText="食事データ削除"
                      onClick={() => { onClickDeleteButton(data.id); }}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <Box>食事のデータはありません</Box>
      ) }
    </Box>
  );
});
