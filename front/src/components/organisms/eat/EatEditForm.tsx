import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import { useEatApi } from "../../../hooks/eat/useEatApi";
import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useMessage } from "../../../hooks/common/useMessage";
import { Eat } from "../../../types/api/eat";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputName } from "../input/common/InputName";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { InputEatDate } from "../input/common/InputEatDate";
import { RadioEatType } from "../input/common/RadioEatType";
import { RadioEatTiming } from "../input/common/RadioEatTiming";
import { InputKcal } from "../input/common/InputKcal";
import { InputPrice } from "../input/common/InputPrice";
import { InputFoodAmount } from "../input/common/InputFoodAmount";
import { SelectFoodUnit } from "../input/common/SelectFoodUnit";
import { InputNote } from "../input/common/InputNote";
import { InputProtein } from "../input/common/InputProtein";
import { InputShop } from "../input/common/InputShop";
import { CheckDiscounted } from "../input/common/CheckDiscounted";

type Props = {
  eat?: Eat | null;
  initialEatDate?: string;
  setEatData: (eat: Eat) => void;
};

export const EatEditForm: VFC<Props> = memo((props) => {
  const { eat = null, initialEatDate = "", setEatData } = props;
  const { showMessage } = useMessage();
  const { addEat, editEat } = useEatApi();
  const {
    validateName,
    validateFoodCategory,
    validateShop,
    validateNote,
    validateEatDate,
  } = useCommonValidate();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [kcal, setKcal] = useState(0);
  const [price, setPrice] = useState(0);
  const [eatType, setEatType] = useState("外食");
  const [eatTiming, setEatTiming] = useState("朝食");
  const [eatDate, setEatDate] = useState("");
  const [foodAmount, setFoodAmount] = useState(0);
  const [foodUnit, setFoodUnit] = useState("");
  const [protein, setProtein] = useState(0);
  const [shop, setShop] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [eatDateInvalid, setEatDateInvalid] = useState(false);
  const [shopInvalid, setShopInvalid] = useState(false);
  const [noteInvalid, setNoteInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [eatDateError, setEatDateError] = useState("");
  const [shopError, setShopError] = useState("");
  const [noteError, setNoteError] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeEatDate = (e: ChangeEvent<HTMLInputElement>) =>
    setEatDate(e.target.value);

  const onChangeFoodUnit = (e: ChangeEvent<HTMLSelectElement>) =>
    setFoodUnit(e.target.value);

  const onChangeShop = (e: ChangeEvent<HTMLInputElement>) =>
    setShop(e.target.value);

  const onChangeDiscounted = (e: ChangeEvent<HTMLInputElement>) =>
    setDiscounted(e.target.checked);

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

  const onBlurEatDate = () => {
    const { invalid, errorMsg } = validateEatDate(eatDate);
    setEatDateInvalid(invalid);
    setEatDateError(errorMsg);
  };

  const onBlurShop = () => {
    const { invalid, errorMsg } = validateShop(shop);
    setShopInvalid(invalid);
    setShopError(errorMsg);
  };

  const onBlurNote = () => {
    const { invalid, errorMsg } = validateNote(note);
    setNoteInvalid(invalid);
    setNoteError(errorMsg);
  };

  const getEatApiData = () => {
    return {
      id,
      name,
      category,
      kcal,
      price,
      eat_type: eatType,
      eat_timing: eatTiming,
      eat_date: eatDate,
      amount: foodAmount,
      unit: foodUnit,
      protein,
      shop,
      discounted,
      note,
    };
  };

  const initModal = () => {
    setId(eat?.id ?? 0);
    setName(eat?.name ?? "");
    setCategory(eat?.category ?? "");
    setKcal(eat?.kcal ?? 0);
    setPrice(eat?.price ?? 0);
    setEatType(eat?.eat_type ?? "");
    setEatTiming(eat?.eat_timing ?? "");
    setFoodAmount(eat?.amount ?? 0);
    setFoodUnit(eat?.unit ?? "");
    setProtein(eat?.protein ?? 0.0);
    setShop(eat?.shop ?? "");
    setDiscounted(eat?.discounted ?? false);
    setNote(eat?.note ?? "");

    let ed = initialEatDate;
    if (eat) {
      ed = eat.eat_date;
    }
    setEatDate(ed);

    setNameInvalid(false);
    setCategoryInvalid(false);
    setEatDateInvalid(false);
    setShopInvalid(false);
    setNoteInvalid(false);

    setNameError("");
    setCategoryError("");
    setEatDateError("");
    setShopError("");
    setNoteError("");
  };

  const callAddEat = () => {
    setButtonLoading(true);
    const addData = getEatApiData();
    addEat(addData)
      .then((res) => {
        showMessage({ title: "登録に成功しました", status: "success" });
        setEatData(res);
        initModal();
      })
      .catch(() => {
        showMessage({ title: "登録に失敗しました", status: "error" });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  const callEditEat = () => {
    setButtonLoading(true);
    const eatData = getEatApiData();
    editEat(eatData)
      .then((res) => {
        showMessage({ title: "更新に成功しました", status: "success" });
        setEatData(res);
        initModal();
      })
      .catch(() => {
        showMessage({ title: "更新に失敗しました", status: "error" });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    initModal();
  }, [eat]);

  useEffect(() => {
    setButtonDisabled(nameInvalid || categoryInvalid
      || shopInvalid || noteInvalid || eatDateInvalid);
  }, [nameInvalid, categoryInvalid, shopInvalid, noteInvalid, eatDateInvalid]);

  const buttonTitle = (id === 0) ? "登録" : "更新";
  const callFunction = (id === 0) ? callAddEat : callEditEat;

  return (
    <>
      <Box className="sectionTitle">
        基本項目
      </Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        <GridItem colSpan={{ base: 6, md: 4 }}>
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
        <GridItem colSpan={{ base: 6, md: 2 }}>
          <InputEatDate
            eatDate={eatDate}
            onChange={onChangeEatDate}
            invalid={eatDateInvalid}
            error={eatDateError}
            onBlur={onBlurEatDate}
          />
        </GridItem>
        <GridItem colSpan={{ base: 6, md: 3 }}>
          <RadioEatTiming
            eatTiming={eatTiming}
            onChange={setEatTiming}
          />
        </GridItem>
        <GridItem colSpan={{ base: 6, md: 2 }}>
          <RadioEatType
            eatType={eatType}
            onChange={setEatType}
          />
        </GridItem>
        <GridItem colSpan={{ base: 5, md: 3 }}>
          <InputShop
            shop={shop}
            onChange={onChangeShop}
            invalid={shopInvalid}
            error={shopError}
            onBlur={onBlurShop}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <CheckDiscounted
            discounted={discounted}
            onChange={onChangeDiscounted}
          />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <InputKcal
            kcal={kcal}
            onChange={setKcal}
          />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <InputPrice
            price={price}
            onChange={setPrice}
          />
        </GridItem>
      </Grid>
      <Box className="sectionTitle">
        詳細項目
      </Box>
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
        p={2}
      >
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <InputFoodAmount
            amount={foodAmount}
            onChange={setFoodAmount}
          />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <SelectFoodUnit
            unit={foodUnit}
            onChange={onChangeFoodUnit}
          />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <InputProtein
            protein={protein}
            onChange={setProtein}
          />
        </GridItem>
        <GridItem colSpan={5}>
          <InputNote
            note={note}
            onChange={onChangeNote}
            invalid={noteInvalid}
            error={noteError}
            onBlur={onBlurNote}
          />
        </GridItem>
        <GridItem h="100%" colSpan={1} alignItems="end">
          <Flex h="100%" align="end" justify="flex-end">
            <PrimaryButton
              disabled={buttonDisabled}
              loading={buttonLoading}
              onClick={callFunction}
            >
              {buttonTitle}
            </PrimaryButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
});
