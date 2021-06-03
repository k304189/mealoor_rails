import { ChangeEvent, memo, useState, VFC } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useMessage } from "../../../hooks/common/useMessage";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputName } from "../input/common/InputName";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { InputKcal } from "../input/common/InputKcal";
import { InputPrice } from "../input/common/InputPrice";
import { InputFoodAmount } from "../input/common/InputFoodAmount";
import { SelectFoodUnit } from "../input/common/SelectFoodUnit";
import { InputNote } from "../input/common/InputNote";
import { InputProtein } from "../input/common/InputProtein";
import { InputShop } from "../input/common/InputShop";
import { CheckDiscounted } from "../input/common/CheckDiscounted";

export const EatEditForm: VFC = memo(() => {
  const { showMessage } = useMessage();
  const {
    validateName,
    validateFoodCategory,
    validateShop,
    validateNote,
  } = useCommonValidate();

  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [kcal, setKcal] = useState(0);
  const [price, setPrice] = useState(0);
  const [foodAmount, setFoodAmount] = useState(0);
  const [foodUnit, setFoodUnit] = useState("");
  const [protein, setProtein] = useState(0);
  const [shop, setShop] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [shopInvalid, setShopInvalid] = useState(false);
  const [noteInvalid, setNoteInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [shopError, setShopError] = useState("");
  const [noteError, setNoteError] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

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
        <GridItem colSpan={{ base: 2, md: 2 }}>
          <InputShop
            shop={shop}
            onChange={onChangeShop}
            invalid={shopInvalid}
            error={shopError}
            onBlur={onBlurShop}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <CheckDiscounted
            discounted={discounted}
            onChange={onChangeDiscounted}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <InputPrice
            price={price}
            onChange={setPrice}
          />
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <InputKcal
            kcal={kcal}
            onChange={setKcal}
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
              onClick={() => {}}
            >
              登録
            </PrimaryButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
});
