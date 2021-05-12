import { ChangeEvent, memo, useState, VFC } from "react";
import { Box, Flex, Grid, GridItem, Heading, Spacer } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { StockEditForm } from "../../organisms/stock/StockEditForm";

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
              <StockEditForm />
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
