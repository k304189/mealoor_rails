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
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SeasonalFood } from "../../../types/api/seasonalFood";

const sampleData = [
  { id: 1, name: "リンゴ", category: "フルーツ", start_month: 1, end_month: 3 },
  { id: 2, name: "オレンジ", category: "フルーツ", start_month: 2, end_month: 3 },
  { id: 3, name: "もも", category: "フルーツ", start_month: 3, end_month: 3 },
  { id: 4, name: "なし", category: "フルーツ", start_month: 4, end_month: 3 },
  { id: 5, name: "ぶどう", category: "フルーツ", start_month: 5, end_month: 3 },
  { id: 6, name: "トマト", category: "緑黄色野菜", start_month: 6, end_month: 3 },
  { id: 7, name: "キャベツ", category: "淡色野菜", start_month: 7, end_month: 3 },
  { id: 8, name: "ピーマン", category: "緑黄色野菜", start_month: 8, end_month: 3 },
  { id: 9, name: "ニラ", category: "緑黄色野菜", start_month: 9, end_month: 3 },
  { id: 10, name: "白菜", category: "淡色野菜", start_month: 10, end_month: 3 },
];

export const SeasonalFoodList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [seasonalFoods, setSeasonalFoods] = useState<Array<SeasonalFood>>(sampleData);
  const [selectSeasonalFood, setSelectSeasonalFood] = useState<SeasonalFood | null>();
  const onClickSeasonalFood = (id: number) => {
    const target = seasonalFoods.find((seasonalFood) => seasonalFood.id === id);
    setSelectSeasonalFood(target);
    onOpen();
  };
  const onCreateSeasonalFoodModal = () => {
    setSelectSeasonalFood(null);
    onOpen();
  };

  return (
    <SigninHeaderLayout>
      <Flex align="center" justify="center" height="100vh">
        <Box as="article" p={4}>
          <PrimaryButton onClick={onCreateSeasonalFoodModal}>新規作成</PrimaryButton>
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
                  <Td>{data.start_month}</Td>
                  <Td>{data.end_month}</Td>
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
