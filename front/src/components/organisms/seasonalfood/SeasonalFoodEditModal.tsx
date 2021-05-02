import {
  Box,
  Flex,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";

import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SelectMonth } from "../../molecules/select/SelectMonth";
import { SelectCategory } from "../../molecules/select/SelectCategory";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { DefaultInputForm } from "../input/DefaultInputForm";
import { SeasonalFood } from "../../../types/api/seasonalFood";

type Props = {
  seasonalFood?: SeasonalFood;
  isOpen: boolean;
  onClose: () => void;
};

export const SeasonalFoodEditModal: VFC<Props> = memo((props) => {
  const { seasonalFood = null, isOpen, onClose } = props;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [startMonth, setStartMonth] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(0);
  const [nameEmpty, setNameEmpty] = useState(false);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [startMonthEmpty, setStartMonthEmpty] = useState(false);
  const [endMonthEmpty, setEndMonthEmpty] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeStartMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setStartMonth(Number(e.target.value));

  const onChangeEndMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setEndMonth(Number(e.target.value));

  const onBlurName = () =>
    setNameEmpty(name === "");

  const onBlurCategory = () =>
    setCategoryEmpty(category === "");

  const onBlurStartMonthEmpty = () =>
    setStartMonthEmpty(!(startMonth >= 1 && startMonth <= 12));

  const onBlurEndMonthEmpty = () =>
    setEndMonthEmpty(!(endMonth >= 1 && endMonth <= 12));

  const onClickSubmit = () => console.log(`${startMonth} ${startMonthEmpty}`);

  useEffect(() => {
    setName(seasonalFood?.name ?? "");
    setCategory(seasonalFood?.category ?? "");
    setStartMonth(seasonalFood?.startMonth ?? 0);
    setEndMonth(seasonalFood?.endMonth ?? 0);
  }, [seasonalFood]);

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="旬の食材編集"
      buttonTitle="更新"
      onClick={onClickSubmit}
    >
      <Stack spacing={4}>
        <DefaultInputForm
          label="食材名"
          require="require"
          isInvalid={nameEmpty}
          errorMsg="必須項目です。入力してください"
        >
          <DefaultInput
            value={name}
            onChange={onChangeName}
            onBlur={onBlurName}
          />
        </DefaultInputForm>
        <DefaultInputForm
          label="カテゴリー"
          require="require"
          isInvalid={categoryEmpty}
          errorMsg="必須項目です。選択してください"
        >
          <SelectCategory
            selectedValue={category}
            onChange={onChangeCategory}
            onBlur={onBlurCategory}
          />
        </DefaultInputForm>
        <Flex>
          <Box w="40%">
            <DefaultInputForm
              label="開始月"
              require="require"
              isInvalid={startMonthEmpty}
              errorMsg="必須項目です。選択してください"
            >
              <SelectMonth
                selectedValue={startMonth}
                onChange={onChangeStartMonth}
                onBlur={onBlurStartMonthEmpty}
              />
            </DefaultInputForm>
          </Box>
          <Spacer />
          <Box w="40%">
            <DefaultInputForm
              label="終了月"
              require="require"
              isInvalid={endMonthEmpty}
              errorMsg="必須項目です。選択してください"
            >
              <SelectMonth
                selectedValue={endMonth}
                onChange={onChangeEndMonth}
                onBlur={onBlurEndMonthEmpty}
              />
            </DefaultInputForm>
          </Box>
        </Flex>
      </Stack>
    </DefaultModal>
  );
});
