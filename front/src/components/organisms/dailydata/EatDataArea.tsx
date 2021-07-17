import { memo, useState, VFC } from "react";
import {
  Box,
  Flex,
  HStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Spacer,
} from "@chakra-ui/react";
import {
  faClock,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultFontIcon } from "../../atoms/icon/DefaultFontIcon";
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

  const pagingDisplayNum = 4;
  const onChangePaging = (page: {selected: number}) =>
    setPagingOffset(pagingDisplayNum * page.selected);

  const getEatTimingColor = (eatTiming: string) => {
    let eatTimingColor = "#000000";
    if (eatTiming === "朝食") {
      eatTimingColor = "#89C3ED";
    } else if (eatTiming === "昼食") {
      eatTimingColor = "#F7C114";
    } else if (eatTiming === "夕食") {
      eatTimingColor = "#EE827C";
    } else if (eatTiming === "間食") {
      eatTimingColor = "#68BE8D";
    }
    return eatTimingColor;
  };

  const getEatTypeColor = (eatType: string) => {
    let eatTypeColor = "#000000";
    if (eatType === "外食") {
      eatTypeColor = "#016DEA";
    } else if (eatType === "中食") {
      eatTypeColor = "#FADF01";
    } else if (eatType === "自炊") {
      eatTypeColor = "#FA4001";
    }
    return eatTypeColor;
  };

  return (
    <Box w="100%">
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
              <Td w="45%">料理名</Td>
              <Td w="20%">カテゴリー</Td>
              <Td w="15%">値段</Td>
              <Td w="15%">カロリー</Td>
              <Td w="5%" />
            </Tr>
          </Thead>
          <Tbody>
            {eatData
              .slice(pagingOffset, pagingOffset + pagingDisplayNum)
              .map((data) => (
                <Tr key={data.id}>
                  <Td>
                    <Flex>
                      <DefaultLink onClick={() => { onClickEatNameLink(data.id); }}>
                        { data.name.length > 10 ? `${data.name.slice(0, 10)}...` : data.name }
                      </DefaultLink>
                      <Spacer />
                      <HStack>
                        <DefaultFontIcon
                          icon={faClock}
                          tooltipText={`食事タイミング：${data.eat_timing}`}
                          color={getEatTimingColor(data.eat_timing)}
                        />
                        <DefaultFontIcon
                          icon={faUtensils}
                          tooltipText={`食事タイプ：${data.eat_type}`}
                          color={getEatTypeColor(data.eat_type)}
                        />
                      </HStack>
                    </Flex>
                  </Td>
                  <Td>{data.category}</Td>
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
                      size="xs"
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
