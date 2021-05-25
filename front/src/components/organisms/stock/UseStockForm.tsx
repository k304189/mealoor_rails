import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useStockValidate } from "../../../hooks/validate/useStockValidate";
import { useMessage } from "../../../hooks/common/useMessage";
import { useStockApi } from "../../../hooks/stock/useStockApi";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { StockUsage } from "../../../types/pages/stock/stockUsage";
import { Stock } from "../../../types/api/stock";
import { StockUse } from "../../../types/api/stockUse";

import { InputName } from "../input/common/InputName";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { DefaultInputForm } from "../input/DefaultInputForm";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { InputLimit } from "../input/stock/InputLimit";
import { InputNote } from "../input/common/InputNote";
import { RadioEatTiming } from "../input/common/RadioEatTiming";

type Props = {
  useType: string;
  allStocks: Array<Stock>;
  stockUsageList: Array<StockUsage>;
  initStockUsageList: () => void;
}

export const UseStockForm: VFC<Props> = memo((props) => {
  const { useType, allStocks, stockUsageList, initStockUsageList } = props;
  const {
    validateName,
    validateFoodCategory,
    validateNote,
  } = useCommonValidate();
  const { validateLimit } = useStockValidate();
  const { useStock } = useStockApi();
  const { showMessage } = useMessage();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [note, setNote] = useState("");

  const [useDate, setUseDate] = useState("");
  const [eatTiming, setEatTiming] = useState("朝食");
  const [useUrl, setUseUrl] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [limitInvalid, setLimitInvalid] = useState(false);
  const [noteInvalid, setNoteInvalid] = useState(false);
  const [useDateInvalid, setUseDateInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [limitError, setLimitError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [useDateError, setUseDateError] = useState("");

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) =>
    setLimit(e.target.value);

  const onChangeNote = (e: ChangeEvent<HTMLInputElement>) =>
    setNote(e.target.value);

  const onChangeUseDate = (e: ChangeEvent<HTMLInputElement>) =>
    setUseDate(e.target.value);

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

  const onBlurUseDate = () => {
    let msg = "";
    let invalid = false;
    if (useDate === "") {
      msg = "使用日は必須項目です";
      invalid = true;
    }
    setUseDateInvalid(invalid);
    setUseDateError(msg);
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

  const validateUse = () => {
    let isError = false;
    onBlurUseDate();
    if (useDateInvalid) {
      showMessage({ title: useDateError, status: "error" });
      isError = true;
    }
    onBlurNote();
    if (noteInvalid) {
      showMessage({ title: noteError, status: "error" });
      isError = true;
    }
    if (useType === "料理") {
      onBlurName();
      if (nameInvalid) {
        showMessage({ title: nameError, status: "error" });
        isError = true;
      }
      onBlurCategory();
      if (categoryInvalid) {
        showMessage({ title: categoryError, status: "error" });
        isError = true;
      }
      onBlurLimit();
      if (limitInvalid) {
        showMessage({ title: limitError, status: "error" });
        isError = true;
      }
    }
    return isError;
  };

  const onClickUseButton = () => {
    const usage: StockUse = getUsageApiData();
    const validateFlg = validateUse();
    if (validateFlg) {
      return;
    }
    if (useType === "食事") {
      usage.eat_timing = eatTiming;
    } else if (useType === "料理") {
      usage.cook_name = name;
      usage.cook_category = category;
      usage.limit = limit;
    }
    useStock(allStocks, usage, useUrl)
      .then(() => {
        showMessage({ title: "処理に成功しました", status: "success" });
        initStockUsageList();
      })
      .catch(() => {
        showMessage({ title: "処理に失敗しました", status: "error" });
      });
  };

  useEffect(() => {
    let msg = "";
    let url = "";
    if (useType === "処分") {
      msg = "選択した食材の残量を減らします";
      url = "dispose";
    } else if (useType === "分割") {
      msg = "選択した食材の残量を減らし、別の食材データを作成します";
      url = "split";
    } else if (useType === "食事") {
      msg = "選択した食材の残量を減らし、食事データを作成します";
      url = "eat";
    } else if (useType === "料理") {
      msg = "選択した食材を利用して、料理データを作成します";
      url = "cook";
    }
    setConfirmMessage(msg);
    setUseUrl(url);
  }, [useType]);

  return (
    <>
      <Box mb={10}>
        {confirmMessage}
        <br />
        必須項目を入力して、実行ボタンを押して下さい
      </Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={2}>
          <DefaultInputForm
            require="require"
            label="使用日"
            isInvalid={useDateInvalid}
            errorMsg={useDateError}
          >
            <DefaultInput
              value={useDate}
              onChange={onChangeUseDate}
              onBlur={onBlurUseDate}
              type="date"
            />
          </DefaultInputForm>
        </GridItem>
        <GridItem colSpan={4}>
          <InputNote
            note={note}
            onChange={onChangeNote}
            invalid={noteInvalid}
            error={noteError}
            onBlur={onBlurNote}
          />
        </GridItem>
        {useType === "食事" ? (
          <GridItem colSpan={6}>
            <RadioEatTiming eatTiming={eatTiming} onChange={setEatTiming} />
          </GridItem>
        ) : (
          <></>
        )}
        {useType === "料理" ? (
          <>
            <GridItem colSpan={{ base: 6, md: 3 }}>
              <InputName
                name={name}
                onChange={onChangeName}
                invalid={nameInvalid}
                error={nameError}
                onBlur={onBlurName}
              />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 2 }}>
              <SelectFoodCategory
                category={category}
                onChange={onChangeCategory}
                invalid={categoryInvalid}
                error={categoryError}
                onBlur={onBlurCategory}
              />
            </GridItem>
            <GridItem colSpan={{ base: 6, md: 1 }}>
              <InputLimit
                limit={limit}
                onChange={onChangeLimit}
                invalid={limitInvalid}
                error={limitError}
                onBlur={onBlurLimit}
              />
            </GridItem>
          </>
        ) : (
          <></>
        )}
        <GridItem colSpan={1} colStart={6} textAlign="right">
          <PrimaryButton onClick={onClickUseButton}>実行</PrimaryButton>
        </GridItem>
      </Grid>
    </>
  );
});
