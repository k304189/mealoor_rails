import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";

import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SelectMonth } from "../../molecules/select/SelectMonth";
import { SelectCategory } from "../../molecules/select/SelectCategory";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
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

  console.log(`${name} ${category} ${startMonth} ${endMonth}`);

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>旬の食材編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel fontSize="xs">食材名</FormLabel>
              <DefaultInput value={name} onChange={onChangeName} />
            </FormControl>
            <FormControl>
              <FormLabel>カテゴリー</FormLabel>
              <SelectCategory
                selectedValue={category}
                onChange={onChangeCategory}
              />
            </FormControl>
            <Flex>
              <FormControl w="40%">
                <FormLabel>開始月</FormLabel>
                <SelectMonth
                  selectedValue={startMonth}
                  onChange={onChangeStartMonth}
                />
              </FormControl>
              <Spacer />
              <FormControl w="40%">
                <FormLabel>終了月</FormLabel>
                <SelectMonth
                  selectedValue={endMonth}
                  onChange={onChangeEndMonth}
                />
              </FormControl>
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClickSubmit}>更新</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
