import {
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";

import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SelectMonth } from "../../molecules/select/SelectMonth";
import { SelectCategory } from "../../molecules/select/SelectCategory";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
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

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeStartMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setStartMonth(Number(e.target.value));

  const onChangeEndMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setEndMonth(Number(e.target.value));

  const onClickSubmit = () => console.log("Click Button!");

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
        <FormControl>
          <FormLabel fontSize="xs">食材名</FormLabel>
          <DefaultInput value={name} onChange={onChangeName} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="xs">カテゴリー</FormLabel>
          <SelectCategory
            selectedValue={category}
            onChange={onChangeCategory}
          />
        </FormControl>
        <Flex>
          <FormControl w="40%">
            <FormLabel fontSize="xs">開始月</FormLabel>
            <SelectMonth
              selectedValue={startMonth}
              onChange={onChangeStartMonth}
            />
          </FormControl>
          <Spacer />
          <FormControl w="40%">
            <FormLabel fontSize="xs">終了月</FormLabel>
            <SelectMonth
              selectedValue={endMonth}
              onChange={onChangeEndMonth}
            />
          </FormControl>
        </Flex>
      </Stack>
    </DefaultModal>
  );
});
