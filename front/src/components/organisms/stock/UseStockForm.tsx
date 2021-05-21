import { ChangeEvent, memo, useState, VFC } from "react";
import { Flex, Grid, GridItem, VStack } from "@chakra-ui/react";

import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useStockValidate } from "../../../hooks/validate/useStockValidate";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";

import { InputName } from "../input/common/InputName";
import { DefaultInputForm } from "../input/DefaultInputForm";
import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { InputLimit } from "../input/stock/InputLimit";
import { InputNote } from "../input/common/InputNote";

type Props = {
  useType: string;
}

export const UseStockForm: VFC<Props> = memo((props) => {
  const { useType } = props;
  const {
    validateName,
    validateFoodCategory,
    validateNote,
  } = useCommonValidate();
  const { validateLimit } = useStockValidate();

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
              <InputLimit
                limit={limit}
                onChange={onChangeLimit}
                invalid={limitInvalid}
                error={limitError}
                onBlur={onBlurLimit}
              />
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 3 }}>
              <Flex h="100%">
                <DefaultInputForm
                  label="食事量"
                >
                  <DefaultNumberInput
                    value={eatRate}
                    onChange={setEatRate}
                    max={100}
                    unit="%"
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
            />
          </GridItem>
        )}
        <GridItem colSpan={1} colStart={6}>
          <Flex align="flex-end" justify="end" h="100%" mb={3}>
            <PrimaryButton
              size="sm"
              onClick={() => {}}
            >
              {useType}
            </PrimaryButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
});
