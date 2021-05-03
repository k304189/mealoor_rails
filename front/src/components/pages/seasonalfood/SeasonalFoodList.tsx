import { memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Progress,
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
import { useSeasonalFoodApi } from "../../../hooks/seasonalfood/useSeasonalFoodApi";

export const SeasonalFoodList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    errorFlg,
    loading,
    getAllSeasonalFoods,
    allSeasonalFoods } = useSeasonalFoodApi();
  const [selectSeasonalFood, setSelectSeasonalFood] = useState<SeasonalFood | null>();
  const onClickSeasonalFood = (id: number) => {
    const target = allSeasonalFoods.find((seasonalFood) => seasonalFood.id === id);
    setSelectSeasonalFood(target);
    onOpen();
  };
  const onCreateSeasonalFoodModal = () => {
    setSelectSeasonalFood(null);
    onOpen();
  };

  useEffect(() => getAllSeasonalFoods(), []);

  return (
    <SigninHeaderLayout>
      { loading ? (
        <Flex align="center" justify="center" height="100vh">
          <Progress size="sm" w="50%" isIndeterminate />
        </Flex>
      ) : (
        <>
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
                  {allSeasonalFoods.map((data) => (
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
        </>
      ) }
    </SigninHeaderLayout>
  );
});
