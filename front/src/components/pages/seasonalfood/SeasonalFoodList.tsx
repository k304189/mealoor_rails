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
import { useMessage } from "../../../hooks/common/useMessage";
import { useSeasonalFoodApi } from "../../../hooks/seasonalfood/useSeasonalFoodApi";

export const SeasonalFoodList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allSeasonalFoods, getAllSeasonalFoods } = useSeasonalFoodApi();
  const { showMessage } = useMessage();
  const [selectSeasonalFood, setSelectSeasonalFood] = useState<SeasonalFood | null>();
  const [loading, setLoading] = useState(false);
  const onClickSeasonalFood = (id = 0) => {
    const target = allSeasonalFoods.find((seasonalFood) => seasonalFood.id === id);
    const index = allSeasonalFoods.findIndex((seasonalFood) => seasonalFood.id === id);
    setSelectSeasonalFood(target);
    onOpen();
  };

  useEffect(() => {
    setLoading(true);
    getAllSeasonalFoods()
      .catch(() => {
        showMessage({ title: "データの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
              <PrimaryButton onClick={onClickSeasonalFood}>新規作成</PrimaryButton>
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
            allSeasonalFoods={allSeasonalFoods}
            seasonalFood={selectSeasonalFood}
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      ) }
    </SigninHeaderLayout>
  );
});
