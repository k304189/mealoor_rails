import { ChangeEvent, memo, useState, VFC } from "react";
import { Box, Flex, Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { StockTypeRadio } from "../../organisms/input/stock/StockTypeRadio";
import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { DefaultInputForm } from "../../organisms/input/DefaultInputForm";
import { NameForm } from "../../organisms/input/common/NameForm";
import { CategoryForm } from "../../organisms/input/common/CategoryForm";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SelectCategory } from "../../molecules/select/SelectCategory";

export const StockEdit: VFC = memo(() => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [price, setPrice] = useState(0);
  const [kcal, setKcal] = useState(0);
  const [remain, setRemain] = useState(100);
  const [amount, setAmount] = useState(0);
  const [unit, setUnit] = useState("");
  const [protein, setProtein] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [stockType, setStockType] = useState("");
  const [shop, setShop] = useState("");
  const [discounted, setDiscounted] = useState(false);
  const [note, setNote] = useState("");
  const [limitInvalid, setLimitInvalid] = useState<boolean>();
  const [stockTypeInvalid, setStockTypeInvalid] = useState<boolean>();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeLimit = (e: ChangeEvent<HTMLInputElement>) =>
    setLimit(e.target.value);

  const onChangePrice = (v: number) =>
    setPrice(v);

  const onChangeKcal = (v: number) =>
    setKcal(v);

  const onChangeAmount = (v: number) =>
    setAmount(v);

  const onChangeProtein = (v: number) =>
    setProtein(v);

  const onChangeQuantity = (v: number) =>
    setQuantity(v);

  const onChangeStockType = (e: ChangeEvent<HTMLInputElement>) =>
    setStockType(e.target.value);

  const onChangeShop = (e: ChangeEvent<HTMLInputElement>) =>
    setShop(e.target.value);

  // const onChangeDiscounted = (e: ChangeEvent<HTMLInputElement>) =>
  //   setDiscounted(e.target.value);

  const onChangeNote = (e: ChangeEvent<HTMLInputElement>) =>
    setNote(e.target.value);

  const onBlurLimit = () =>
    setLimitInvalid(limit === "");

  console.log(price);
  console.log(kcal);

  return (
    <SigninHeaderLayout>
      <Flex className="main" align="center" justify="center">
        <Box w="95%" h="95%">
          <Box as="article" w="100%">
            <Heading>
              食材登録
            </Heading>
          </Box>
          <Flex mt={3}>
            <Box
              as="article"
              w={{ base: "100%", md: "60%" }}
              h="100%"
              px={4}
              py={4}
            >
              登録フォーム
              <Grid
                h="100%"
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={1} colSpan={{ base: 6, md: 4 }}>
                  <NameForm
                    name={name}
                    onChange={onChangeName}
                  />
                </GridItem>
                <GridItem rowSpan={1} colSpan={{ base: 6, md: 2 }}>
                  <CategoryForm
                    category={category}
                    onChange={onChangeCategory}
                  />
                </GridItem>

                <GridItem rowSpan={1} colSpan={{ base: 6, md: 2 }}>
                  <DefaultInputForm
                    require="require"
                    label="賞味期限"
                    isInvalid={limitInvalid}
                    errorMsg="必須項目です。選択してください"
                  >
                    <DefaultInput
                      type="date"
                      value={limit}
                      onChange={onChangeLimit}
                      onBlur={onBlurLimit}
                    />
                  </DefaultInputForm>
                </GridItem>
                <GridItem rowSpan={1} colSpan={{ base: 2, md: 1 }}>
                  <DefaultInputForm
                    require="optional"
                    label="料金"
                  >
                    <DefaultNumberInput
                      value={price}
                      onChange={onChangePrice}
                      unit="円"
                    />
                  </DefaultInputForm>
                </GridItem>
                <GridItem rowSpan={1} colSpan={{ base: 2, md: 1 }}>
                  <DefaultInputForm
                    require="optional"
                    label="カロリー"
                  >
                    <DefaultNumberInput
                      value={kcal}
                      onChange={onChangeKcal}
                      unit="kcal"
                    />
                  </DefaultInputForm>
                </GridItem>
                <GridItem rowSpan={1} colSpan={{ base: 2, md: 1 }}>
                  <DefaultInputForm
                    label="残量"
                    isReadOnly
                  >
                    <DefaultNumberInput
                      value={remain}
                      onChange={() => {}}
                      max={100}
                      unit="%"
                    />
                  </DefaultInputForm>
                </GridItem>

                <GridItem rowSpan={1} colSpan={{ base: 6, md: 3 }}>
                  <DefaultInputForm
                    require="optional"
                    label="食材タイプ"
                  >
                    <StockTypeRadio onChange={setStockType} />
                  </DefaultInputForm>
                </GridItem>
              </Grid>
            </Box>
            <Spacer />
            <Box as="article" w="35%" h="100%" display={{ base: "none", md: "block" }}>
              使用フォーム
            </Box>
          </Flex>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
