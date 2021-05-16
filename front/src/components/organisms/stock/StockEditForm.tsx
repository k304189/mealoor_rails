import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import { Stock } from "../../../types/api/stock";
import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useStockValidate } from "../../../hooks/validate/useStockValidate";
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

import { InputLimit } from "../input/stock/InputLimit";
import { InputRemain } from "../input/stock/InputRemain";
import { InputQuantity } from "../input/stock/InputQuantity";
import { RadioStockType } from "../input/stock/RadioStockType";
import { SelectFoodLocation } from "../input/stock/SelectFoodLocation";

type Props = {
  stock?: Stock | null;
};

export const StockEditForm: VFC<Props> = memo((props) => {
  const { stock = null } = props;
  const {
    validateName,
    validateFoodCategory,
    validateShop,
    validateNote,
  } = useCommonValidate();
  const { validateLimit } = useStockValidate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [kcal, setKcal] = useState(0);
  const [price, setPrice] = useState(0);
  const [remain, setRemain] = useState(100);
  const [foodAmount, setFoodAmount] = useState(0);
  const [foodUnit, setFoodUnit] = useState("");
  const [protein, setProtein] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [stockType, setStockType] = useState("");
  const [shop, setShop] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [limitInvalid, setLimitInvalid] = useState(false);
  const [shopInvalid, setShopInvalid] = useState(false);
  const [noteInvalid, setNoteInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [limitError, setLimitError] = useState("");
  const [shopError, setShopError] = useState("");
  const [noteError, setNoteError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) =>
    setLimit(e.target.value);

  const onChangeFoodUnit = (e: ChangeEvent<HTMLSelectElement>) =>
    setFoodUnit(e.target.value);

  const onChangeLocation = (e: ChangeEvent<HTMLSelectElement>) =>
    setLocation(e.target.value);

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

  const onBlurLimit = () => {
    const { invalid, errorMsg } = validateLimit(limit);
    setLimitInvalid(invalid);
    setLimitError(errorMsg);
  };

  const onBlurShop = () => {
    const { invalid, errorMsg } = validateShop(shop);
    setShopInvalid(invalid);
    setShopError(errorMsg);
  };

  const onBlurNote = () => {
    const { invalid, errorMsg } = validateNote(name);
    setNoteInvalid(invalid);
    setNoteError(errorMsg);
  };

  useEffect(() => {
    setButtonDisabled(nameInvalid || categoryInvalid
      || limitInvalid || shopInvalid || noteInvalid);
  }, [nameInvalid, categoryInvalid, limitInvalid, shopInvalid, noteInvalid]);

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
          <InputLimit
            limit={limit}
            onChange={onChangeLimit}
            invalid={limitInvalid}
            error={limitError}
            onBlur={onBlurLimit}
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
        <GridItem colSpan={{ base: 2, md: 1 }}>
          <InputRemain
            remain={remain}
          />
        </GridItem>
      </Grid>
      <Box className="sectionTitle">
        詳細項目
      </Box>
      <Grid
        templateRows="repeat(2, 1fr)"
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
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <InputProtein
            protein={protein}
            onChange={setProtein}
          />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <InputQuantity
            quantity={quantity}
            onChange={setQuantity}
          />
        </GridItem>
        <GridItem colSpan={{ base: 6, md: 3 }}>
          <SelectFoodLocation
            location={location}
            onChange={onChangeLocation}
          />
        </GridItem>
        <GridItem colSpan={{ base: 6, md: 3 }}>
          <RadioStockType
            stockType={stockType}
            onChange={setStockType}
          />
        </GridItem>
        <GridItem colSpan={5}>
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
        <GridItem colSpan={6}>
          <InputNote
            note={note}
            onChange={onChangeNote}
            invalid={noteInvalid}
            error={noteError}
            onBlur={onBlurNote}
          />
        </GridItem>
        <GridItem colSpan={6}>
          <Flex justify="flex-end">
            <PrimaryButton
              disabled={buttonDisabled}
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
