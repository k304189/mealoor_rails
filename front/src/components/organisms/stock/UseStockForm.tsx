import { ChangeEvent, memo, useState, VFC } from "react";
import { Flex, Grid, GridItem, VStack } from "@chakra-ui/react";

import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useStockValidate } from "../../../hooks/validate/useStockValidate";
import { useMessage } from "../../../hooks/common/useMessage";
import { useStockApi } from "../../../hooks/stock/useStockApi";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { StockUsage } from "../../../types/pages/stock/stockUsage";

import { InputName } from "../input/common/InputName";
import { DefaultInputForm } from "../input/DefaultInputForm";
import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { InputLimit } from "../input/stock/InputLimit";
import { InputNote } from "../input/common/InputNote";

type Props = {
  useType: string;
  useDate: string;
  stockUsageList: Array<StockUsage>;
  setStockUsageList: (arr: Array<StockUsage>) => void;
}

export const UseStockForm: VFC<Props> = memo((props) => {
  const { useType, useDate, stockUsageList, setStockUsageList } = props;
  const {
    validateName,
    validateFoodCategory,
    validateNote,
  } = useCommonValidate();
  const { validateLimit } = useStockValidate();
  const { disposeStock } = useStockApi();
  const { showMessage } = useMessage();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [note, setNote] = useState("");

  const [eatRate, setEatRate] = useState(100);

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [limitInvalid, setLimitInvalid] = useState(false);
  const [noteInvalid, setNoteInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [limitError, setLimitError] = useState("");
  const [noteError, setNoteError] = useState("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) =>
    setLimit(e.target.value);

  const onChangeNote = (e: ChangeEvent<HTMLInputElement>) =>
    setNote(e.target.value);

  const onBlurName = () => {
    const { invalid, errorMsg } = validateName(name);
    setNameInvalid(invalid);
    setNameError(errorMsg);
  };

  const onBlurCategory = () => {
    const { invalid, errorMsg } = validateFoodCategory(category);
    setCategoryInvalid(invalid);
    setCategoryError(errorMsg);
  };

  const onBlurLimit = () => {
    const { invalid, errorMsg } = validateLimit(limit);
    setLimitInvalid(invalid);
    setLimitError(errorMsg);
  };

  const onBlurNote = () => {
    const { invalid, errorMsg } = validateNote(note);
    setNoteInvalid(invalid);
    setNoteError(errorMsg);
  };

  const getUseStockList = () => {
    return stockUsageList.map((data) => {
      return { id: data.id, use_rate: data.use_rate };
    });
  };

  const getUsageApiData = () => {
    return {
      use_type: useType,
      use_date: useDate,
      note,
      use_stocks: getUseStockList(),
    };
  };

  const getCookUsageApiData = () => {
    return {
      use_type: useType,
      use_date: useDate,
      cook_name: name,
      cook_category: category,
      limit,
      eat_rate: eatRate,
      use_stocks: getUseStockList(),
    };
  };

  const checkStockUsageList = () => {
    let checkFlg = false;
    let title = "";
    if (stockUsageList.length <= 0) {
      title = "使用食材が選択されていません";
      checkFlg = true;
    } else {
      const checkedList = stockUsageList.filter((data) => data.use_rate > 0);
      if (checkedList.length === 0) {
        title = "選択されている使用食材の使用量がすべて0です";
        checkFlg = true;
      } else {
        setStockUsageList(checkedList);
      }
    }
    return { checkFlg, title };
  };

  const onClickUseButton = () => {
    const { checkFlg, title } = checkStockUsageList();
    if (checkFlg) {
      showMessage({ title, status: "error" });
      return;
    }

    if (useType !== "料理") {
      const { invalid, errorMsg } = validateNote(note);
      if (invalid) {
        showMessage({ title: errorMsg, status: "error" });
      } else {
        disposeStock(getUsageApiData());
      }
    } else {
      const nameCheck = validateName(name);
      const categoryCheck = validateFoodCategory(category);
      const limitCheck = validateLimit(limit);
      const cookCheckFlg = nameCheck.invalid || categoryCheck.invalid || limitCheck.invalid;
      if (cookCheckFlg) {
        showMessage({ title: "料理の必須項目が不正です", status: "error" });
      } else {
        console.log(getCookUsageApiData());
      }
    }
  };

  return (
    <>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        {useType === "料理" ? (
          <>
            <GridItem colSpan={{ base: 6, md: 3 }}>
              <InputName
                name={name}
                onChange={onChangeName}
                invalid={nameInvalid}
                error={nameError}
                onBlur={onBlurName}
                size="sm"
              />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 2 }}>
              <SelectFoodCategory
                category={category}
                onChange={onChangeCategory}
                invalid={categoryInvalid}
                error={categoryError}
                onBlur={onBlurCategory}
                size="sm"
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 2 }}>
              <InputLimit
                limit={limit}
                onChange={onChangeLimit}
                invalid={limitInvalid}
                error={limitError}
                onBlur={onBlurLimit}
                size="sm"
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 2 }}>
              <Flex h="100%">
                <DefaultInputForm
                  label="食事量"
                >
                  <DefaultNumberInput
                    value={eatRate}
                    onChange={setEatRate}
                    max={100}
                    unit="%"
                    size="sm"
                  />
                </DefaultInputForm>
                <Flex align="center" h="100%" ms={1}>
                  <VStack spacing={1} align="strech">
                    <SecondaryButton size="xs" onClick={() => { setEatRate(100); }}>
                      100%
                    </SecondaryButton>
                    <SecondaryButton size="xs" onClick={() => { setEatRate(0); }}>
                      0%
                    </SecondaryButton>
                  </VStack>
                </Flex>
              </Flex>
            </GridItem>
          </>
        ) : (
          <GridItem colSpan={5}>
            <InputNote
              note={note}
              onChange={onChangeNote}
              invalid={noteInvalid}
              error={noteError}
              onBlur={onBlurNote}
              size="sm"
            />
          </GridItem>
        )}
        <GridItem colSpan={1} colStart={6}>
          <Flex align="flex-end" justify="end" h="100%" mb={3}>
            <PrimaryButton
              size="sm"
              onClick={onClickUseButton}
            >
              {useType}
            </PrimaryButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
});
