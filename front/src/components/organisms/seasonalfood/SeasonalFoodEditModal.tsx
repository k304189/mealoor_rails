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
import { useSeasonalFoodApi } from "../../../hooks/seasonalfood/useSeasonalFoodApi";
import { SeasonalFood } from "../../../types/api/seasonalFood";

type Props = {
  seasonalFood?: SeasonalFood | null;
  isOpen: boolean;
  onClose: () => void;
};

export const SeasonalFoodEditModal: VFC<Props> = memo((props) => {
  const { seasonalFood = null, isOpen, onClose } = props;
  const { addSeasonalFood } = useSeasonalFoodApi();
  const [id, setId] = useState<number>(0);
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

  const addData = () => {
    addSeasonalFood({
      id,
      name,
      category,
      start_month: startMonth,
      end_month: endMonth,
    });
  };

  useEffect(() => {
    setId(seasonalFood?.id ?? 0);
    setName(seasonalFood?.name ?? "");
    setCategory(seasonalFood?.category ?? "");
    setStartMonth(seasonalFood?.start_month ?? 0);
    setEndMonth(seasonalFood?.end_month ?? 0);
  }, [seasonalFood]);
  const editType = (id === 0) ? "登録" : "編集";
  const buttonTitle = (id === 0) ? "登録" : "更新";
  const callFunction = (id === 0) ? addData : () => { console.log("更新関数実行"); };

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={`旬の食材${editType}`}
      buttonTitle={buttonTitle}
      onClick={callFunction}
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
