import { memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { SeasonalFoodEditModal } from "../../organisms/seasonalfood/SeasonalFoodEditModal";
import { DefaultDialog } from "../../molecules/layout/DefaultDialog";
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DeleteButton } from "../../atoms/button/DeleteButton";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { SeasonalFood } from "../../../types/api/seasonalFood";
import { useMessage } from "../../../hooks/common/useMessage";
import { useSeasonalFoodApi } from "../../../hooks/seasonalfood/useSeasonalFoodApi";

export const SeasonalFoodList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allSeasonalFoods, getAllSeasonalFoods, deleteSeasonalFood } = useSeasonalFoodApi();
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
    getAllSeasonalFoods()
      .catch(() => {
        showMessage({ title: "データの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SigninHeaderLayout loading={loading}>
      <>
        <Flex align="center" justify="center" height="100vh">
          <Box as="article" p={4}>
            <Flex>
              <PrimaryButton onClick={onClickSeasonalFood}>新規作成</PrimaryButton>
              <Spacer />
              <DefaultPaging
                displayNum={displayNum}
                dataNum={allSeasonalFoods.length}
                onPageChange={onClickPageChange}
              />
            </Flex>
            <Table variant="simple">
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
                          onClick={() => onClickSeasonalFood(data.id)}
                        >
                          {data.name}
                        </DefaultLink>
                      </Td>
                      <Td>{data.category}</Td>
                      <Td>{data.start_month}</Td>
                      <Td>{data.end_month}</Td>
                      <Td>
                        <DeleteButton
                          onClick={() => { onClickDeleteSeasonalFood(data.id); }}
                        />
                      </Td>
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
        <DefaultDialog
          isOpen={isDialogOpen}
          headerTitle="データ削除確認"
          onClose={cancelDelete}
          onClick={callDeleteSeasonalFood}
        >
          {deleteConfirmMsg}
        </DefaultDialog>
      </>
    </SigninHeaderLayout>
  );
});
