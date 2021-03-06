import { memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Center,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { SeasonalFoodEditModal } from "../../organisms/seasonalfood/SeasonalFoodEditModal";
import { DefaultDialog } from "../../molecules/layout/DefaultDialog";
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DeleteButton } from "../../molecules/button/DeleteButton";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { SeasonalFood } from "../../../types/api/seasonalFood";
import { useMessage } from "../../../hooks/common/useMessage";
import { useSeasonalFoodApi } from "../../../hooks/seasonalfood/useSeasonalFoodApi";
import { useUserApi } from "../../../hooks/user/useUserApi";

export const SeasonalFoodList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allSeasonalFoods, getAllSeasonalFoods, deleteSeasonalFood } = useSeasonalFoodApi();
  const { isLogin } = useUserApi();
  const { showMessage } = useMessage();
  const [selectSeasonalFood, setSelectSeasonalFood] = useState<SeasonalFood | null>();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteConfirmMsg, setDeleteConfirmMsg] = useState("");
  const [deleteSeasonalFoodId, setDeleteSeasonalFoodId] = useState(0);
  const [pagingOffset, setPagingOffset] = useState(0);
  const displayNum = 10;

  const onClickSeasonalFood = (id = 0) => {
    const target = allSeasonalFoods.find((seasonalFood) => seasonalFood.id === id);
    setSelectSeasonalFood(target);
    onOpen();
  };

  const callDeleteSeasonalFood = () => {
    if (deleteSeasonalFoodId !== 0) {
      deleteSeasonalFood(allSeasonalFoods, deleteSeasonalFoodId)
        .then(() => {
          showMessage({ title: "データの削除に成功しました", status: "success" });
          setDeleteSeasonalFoodId(0);
          setIsDialogOpen(false);
        })
        .catch(() => {
          showMessage({ title: "データの削除に失敗しました", status: "error" });
        });
    } else {
      showMessage({ title: "削除データが特定できません", status: "error" });
    }
  };

  const onClickDeleteSeasonalFood = (id = 0) => {
    let confirmMsg = "";
    const target = allSeasonalFoods.find((seasonalFood) => seasonalFood.id === id);
    if (target) {
      confirmMsg = `名前：${target.name} 開始月：${target.start_month}のデータを
        \n削除してもよろしいでしょうか？`;
      setDeleteConfirmMsg(confirmMsg);
      setDeleteSeasonalFoodId(id);
      setIsDialogOpen(true);
    } else {
      showMessage({ title: "対象データの削除ができません", status: "warning" });
    }
  };

  const cancelDelete = () => {
    setDeleteSeasonalFoodId(0);
    setIsDialogOpen(false);
  };

  const onClickPageChange = (page: {selected: number}) => {
    setPagingOffset(displayNum * page.selected);
  };

  useEffect(() => {
    setLoading(true);
    isLogin(true)
      .then((result) => {
        if (result) {
          getAllSeasonalFoods()
            .catch(() => {
              showMessage({ title: "データの取得に失敗しました", status: "error" });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title="旬の食材" titleClass="adminSection">
      <>
        <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
          <Box as="article" w="100%" h="100%">
            <Center>
              <Box w="50%">
                <Flex>
                  <PrimaryButton onClick={onClickSeasonalFood}>旬の食材登録</PrimaryButton>
                  <Spacer />
                  <DefaultPaging
                    displayNum={displayNum}
                    dataNum={allSeasonalFoods.length}
                    onPageChange={onClickPageChange}
                  />
                </Flex>
                { allSeasonalFoods ? (
                  <Table variant="simple" size="sm">
                    <Thead>
                      <Tr fontSize={{ base: "sm", md: "md" }}>
                        <Td w="200px">食材名</Td>
                        <Td w="200px">カテゴリー</Td>
                        <Td w="100px">開始月</Td>
                        <Td w="100px">終了月</Td>
                        <Td w="30px" />
                      </Tr>
                    </Thead>
                    <Tbody>
                      {allSeasonalFoods
                        .slice(pagingOffset, pagingOffset + displayNum)
                        .map((data) => (
                          <Tr key={data.id}>
                            <Td p={0}>
                              <DefaultLink
                                tooltipText="編集画面へ"
                                onClick={() => onClickSeasonalFood(data.id)}
                              >
                                {data.name}
                              </DefaultLink>
                            </Td>
                            <Td>{data.category}</Td>
                            <Td>{data.start_month}月</Td>
                            <Td>{data.end_month}月</Td>
                            <Td>
                              <DeleteButton
                                size="xs"
                                tooltipText="データ削除"
                                onClick={() => { onClickDeleteSeasonalFood(data.id); }}
                              />
                            </Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Box>旬の食材が存在しません</Box>
                )}
              </Box>
            </Center>
          </Box>
        </Flex>
        <SeasonalFoodEditModal
          allSeasonalFoods={allSeasonalFoods}
          seasonalFood={selectSeasonalFood}
          isOpen={isOpen}
          onClose={onClose}
        />
        <DefaultDialog
          isOpen={isDialogOpen}
          headerTitle="データ削除確認"
          onClose={cancelDelete}
          onClick={callDeleteSeasonalFood}
        >
          {deleteConfirmMsg}
        </DefaultDialog>
      </>
    </HeaderLayout>
  );
});
