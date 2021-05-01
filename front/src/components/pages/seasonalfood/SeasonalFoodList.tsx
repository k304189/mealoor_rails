import { memo, useState, VFC } from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { SeasonalFoodEditModal } from "../../organisms/seasonalfood/SeasonalFoodEditModal";
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { SeasonalFood } from "../../../types/api/seasonalFood";

const sampleData = [
  { id: 1, name: "リンゴ", category: "フルーツ", startMonth: 1, endMonth: 3 },
  { id: 2, name: "オレンジ", category: "フルーツ", startMonth: 2, endMonth: 3 },
  { id: 3, name: "もも", category: "フルーツ", startMonth: 3, endMonth: 3 },
  { id: 4, name: "なし", category: "フルーツ", startMonth: 4, endMonth: 3 },
  { id: 5, name: "ぶどう", category: "フルーツ", startMonth: 5, endMonth: 3 },
  { id: 6, name: "トマト", category: "緑黄色野菜", startMonth: 6, endMonth: 3 },
  { id: 7, name: "キャベツ", category: "淡色野菜", startMonth: 7, endMonth: 3 },
  { id: 8, name: "ピーマン", category: "緑黄色野菜", startMonth: 8, endMonth: 3 },
  { id: 9, name: "ニラ", category: "緑黄色野菜", startMonth: 9, endMonth: 3 },
  { id: 10, name: "白菜", category: "淡色野菜", startMonth: 10, endMonth: 3 },
];

export const SeasonalFoodList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [seasonalFoods, setSeasonalFoods] = useState<Array<SeasonalFood>>(sampleData);
  const [selectSeasonalFood, setSelectSeasonalFood] = useState<SeasonalFood>();
  const onClickSeasonalFood = (id: number) => {
    const target = seasonalFoods.find((seasonalFood) => seasonalFood.id === id);
    setSelectSeasonalFood(target);
    onOpen();
  };

  return (
    <SigninHeaderLayout>
      <Flex align="center" justify="center" height="100vh">
        <Box as="article" p={4}>
          <Table variant="simple">
            <Thead>
              <Tr fontSize={{ base: "sm", md: "md" }}>
                <Td w="200px">食材名</Td>
                <Td w="200px">カテゴリー</Td>
                <Td w="100px">開始月</Td>
                <Td w="100px">終了月</Td>
              </Tr>
            </Thead>
            <Tbody>
              {seasonalFoods.map((data) => (
                <Tr key={data.id}>
                  <Td p={0}>
                    <DefaultLink
                      onClick={() => onClickSeasonalFood(data.id)}
                    >
                      {data.name}
                    </DefaultLink>
                  </Td>
                  <Td>{data.category}</Td>
                  <Td>{data.startMonth}</Td>
                  <Td>{data.endMonth}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <SeasonalFoodEditModal
        seasonalFood={selectSeasonalFood}
        isOpen={isOpen}
        onClose={onClose}
      />
    </SigninHeaderLayout>
  );
});
