import { memo, useEffect, useState, VFC } from "react";
import {
  Box,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { HavingStockTable } from "../../organisms/stock/HavingStockTable";
import { UseStockTable } from "../../organisms/stock/UseStockTable";
import { StockEditForm } from "../../organisms/stock/StockEditForm";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

import { useMessage } from "../../../hooks/common/useMessage";
import { useStockApi } from "../../../hooks/stock/useStockApi";
import { Stock } from "../../../types/api/stock";

const sampleStocks = [
  { id: 1, name: "じゃがいも", category: "いも", limit: "2021-06-01", remain: 100 },
  { id: 2, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 100, kcal: 300, remain: 100 },
  { id: 3, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 4, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 5, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 6, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 7, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 8, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 9, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 10, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 11, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 12, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 13, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 14, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 15, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 16, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 17, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 18, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 19, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
  { id: 20, name: "じゃがいも", category: "いも", limit: "2021-06-01", price: 1000, kcal: 3000, remain: 100 },
];

export const StockList: VFC = memo(() => {
  const [havingStocks, setHavingStocks] = useState(sampleStocks);
  const [havingPagingOffset, setHavingPagingOffset] = useState(0);
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const { showMessage } = useMessage();
  const { allStocks, getHavingStock } = useStockApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const havingPagingDisplayNum = 20;
  const onChangeHavingPage = (page: {selected: number}) =>
    setHavingPagingOffset(havingPagingDisplayNum * page.selected);

  const openEditModal = (editMode = false) => {
    let title = "";
    if (editMode) {
      title = "食材編集";
    } else {
      setStock(null);
      title = "食材登録";
    }
    setModalTitle(title);
    onOpen();
  };

  const onClickNameLink = (id = 0) => {
    const index = allStocks.findIndex((data) => data.id === id);
    let selectedStock: Stock | null = null;
    let editMode = false;
    if (index >= 0) {
      selectedStock = allStocks[index];
      editMode = true;
    }
    setStock(selectedStock);
    openEditModal(editMode);
  };

  useEffect(() => {
    setLoading(true);
    getHavingStock()
      .catch(() => {
        showMessage({ title: "家にある食材の取得に失敗しました", status: "success" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SigninHeaderLayout loading={loading} title="家にある食材">
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
        <Box
          as="article"
          h="100%"
          w={{ base: "100%", md: "70%" }}
          mr={{ base: 0, md: 3 }}
          mb={{ base: 3, md: 0 }}
        >
          <Flex>
            <PrimaryButton size="sm" onClick={() => { openEditModal(); }}>食材追加</PrimaryButton>
            <Spacer />
            <DefaultPaging
              displayNum={havingPagingDisplayNum}
              dataNum={allStocks.length}
              onPageChange={onChangeHavingPage}
            />
          </Flex>
          <HavingStockTable
            havingStocks={allStocks}
            pagingDisplayNum={havingPagingDisplayNum}
            pagingOffset={havingPagingOffset}
            onClickNameLink={onClickNameLink}
          />
        </Box>
        <Box
          as="article"
          h="100%"
          w={{ base: "100%", md: "30%" }}
        >
          選択中食材
          <UseStockTable useStocks={havingStocks} />
        </Box>
      </Flex>
      <DefaultModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={modalTitle}
        size="4xl"
      >
        <StockEditForm allStocks={allStocks} stock={stock} />
      </DefaultModal>
    </SigninHeaderLayout>
  );
});
