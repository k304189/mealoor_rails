import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";

import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { HavingStockTable } from "../../organisms/stock/HavingStockTable";
import { StockUsageTable } from "../../organisms/stock/StockUsageTable";
import { StockEditForm } from "../../organisms/stock/StockEditForm";
import { UseStockForm } from "../../organisms/stock/UseStockForm";
import { UsageListTable } from "../../organisms/stock/UsageListTable";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

import { useMessage } from "../../../hooks/common/useMessage";
import { useStockApi } from "../../../hooks/stock/useStockApi";
import { Stock } from "../../../types/api/stock";
import { StockUsage } from "../../../types/pages/stock/stockUsage";

export const StockList: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [useDialogIsOpen, setUseDialogIsOpen] = useState(false);
  const [stockUsageList, setStockUsageList] = useState<Array<StockUsage>>([]);
  const [checkedList, setCheckedList] = useState<Array<number>>([]);
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [useType, setUseType] = useState("食事");
  const { showMessage } = useMessage();
  const { allStocks, getHavingStock } = useStockApi();

  const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const checkFlg = e.target.checked;
    if (checkFlg) {
      const index = allStocks.findIndex((data) => data.id === id);
      if (index > -1) {
        const { name, remain = 0, quantity = 1 } = allStocks[index];
        const addStockUsage = {
          id,
          name,
          remain,
          quantity,
          per_rate: Math.floor(100 / quantity),
          use_rate: 0,
        };
        setStockUsageList([...stockUsageList, addStockUsage]);
        setCheckedList([...checkedList, id]);
      }
    } else {
      const index = stockUsageList.findIndex((data) => data.id === id);
      if (index > -1) {
        stockUsageList.splice(index, 1);
        setStockUsageList([...stockUsageList]);
        const idIndex = checkedList.indexOf(id);
        if (id > -1) {
          checkedList.splice(idIndex, 1);
          setCheckedList([...checkedList]);
        }
      }
    }
  };

  const onChangeUsedRate = (value: number, id: number) => {
    const index = stockUsageList.findIndex((data) => data.id === id);
    if (index > -1) {
      const stockUsage = stockUsageList[index];
      stockUsage.use_rate = value;
      stockUsageList.splice(index, 1, stockUsage);
      setStockUsageList([...stockUsageList]);
    }
  };

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

  const onClickUseButton = () => {
    let title = "";
    if (stockUsageList.length <= 0) {
      title = "使用食材が選択されていません";
    } else {
      const useRate0List = stockUsageList.filter((data) => data.use_rate > 0);
      if (useRate0List.length === 0) {
        title = "選択されている使用食材の使用量がすべて0です";
      } else {
        setStockUsageList([...useRate0List]);
        setCheckedList([...useRate0List.map((data) => { return data.id; })]);
      }
    }
    if (title) {
      showMessage({ title, status: "error" });
    } else {
      setUseDialogIsOpen(true);
    }
  };

  const initStockUsageList = () => {
    setStockUsageList([]);
    setCheckedList([]);
    setUseDialogIsOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    getHavingStock()
      .catch(() => {
        showMessage({ title: "家にある食材の取得に失敗しました", status: "error" });
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
          w={{ base: "100%", md: "60%" }}
          mr={{ base: 0, md: 3 }}
          mb={{ base: 3, md: 0 }}
        >
          <HavingStockTable
            havingStocks={allStocks}
            checkedList={checkedList}
            openEditModal={openEditModal}
            onClickNameLink={onClickNameLink}
            onChangeCheckbox={onChangeCheckbox}
          />
        </Box>
        <Box
          as="article"
          h="100%"
          w={{ base: "100%", md: "40%" }}
        >
          <StockUsageTable
            stockUsageList={stockUsageList}
            checkedList={checkedList}
            useType={useType}
            setUseType={setUseType}
            onChangeCheckbox={onChangeCheckbox}
            onChangeUsedRate={onChangeUsedRate}
            onClickUseButton={onClickUseButton}
          />
        </Box>
      </Flex>
      <DefaultModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={modalTitle}
        size="full"
      >
        <Flex>
          <Box w={{ base: "100%", md: "60%" }}>
            <StockEditForm allStocks={allStocks} stock={stock} />
          </Box>
          <Box
            w={{ base: "0%", md: "40%" }}
            display={{ base: "none", md: "block" }}
            ml={5}
            pl={1}
            borderLeft="1px"
            borderLeftColor="gray.100"
          >
            <UsageListTable stock={stock} />
          </Box>
        </Flex>
      </DefaultModal>
      <DefaultModal
        isOpen={useDialogIsOpen}
        onClose={() => { setUseDialogIsOpen(false); }}
        modalTitle={`${useType}確認`}
        size="3xl"
      >
        <UseStockForm
          allStocks={allStocks}
          useType={useType}
          stockUsageList={stockUsageList}
          initStockUsageList={initStockUsageList}
        />
      </DefaultModal>
    </SigninHeaderLayout>
  );
});
