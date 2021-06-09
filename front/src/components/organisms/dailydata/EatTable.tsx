import { memo, useEffect, useState, VFC } from "react";
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
import { Eat } from "../../../types/api/eat";

type Props = {
  eatTiming: "朝食" | "昼食" | "夕食" | "間食";
  eatData: Array<Eat> | null;
  onClickEatNameLink: (id: number) => void;
};

export const EatTable: VFC<Props> = memo((props) => {
  const { eatTiming, eatData, onClickEatNameLink } = props;

  const [displayEatData, setDisplayEatData] = useState<Array<Eat> | null>(null);
  const [pagingOffset, setPagingOffset] = useState(0);

  const pagingDisplayNum = 5;
  const onChangePaging = (page: {selected: number}) =>
    setPagingOffset(pagingDisplayNum * page.selected);

  useEffect(() => {
    if (eatData) {
      setDisplayEatData(eatData.filter((data) => data.eat_timing === eatTiming));
    }
  }, [eatData]);

  return (
    <>
      { (displayEatData && displayEatData.length > 0) ? (
        <>
          <Flex>
            <Box className="sectionTitle">
              {eatTiming}
            </Box>
            <Spacer />
            <DefaultPaging
              displayNum={pagingDisplayNum}
              dataNum={displayEatData.length}
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
              {displayEatData
                .slice(pagingOffset, pagingOffset + pagingDisplayNum)
                .map((data) => (
                  <Tr key={data.id}>
                    <Td>
                      <DefaultLink onClick={() => { onClickEatNameLink(data.id); }}>
                        {data.name}
                      </DefaultLink>
                    </Td>
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
        <Box>{eatTiming}の食事データはありません</Box>
      ) }
    </>
  );
});
