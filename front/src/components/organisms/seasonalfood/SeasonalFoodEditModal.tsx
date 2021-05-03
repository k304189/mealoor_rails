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
import { useMessage } from "../../../hooks/common/useMessage";
import { SeasonalFood } from "../../../types/api/seasonalFood";

type Props = {
  seasonalFood?: SeasonalFood | null;
  isOpen: boolean;
  onClose: () => void;
};

export const SeasonalFoodEditModal: VFC<Props> = memo((props) => {
  const { seasonalFood = null, isOpen, onClose } = props;
  const { errorFlg, loading, addSeasonalFood, editSeasonalFood } = useSeasonalFoodApi();
  const { showMessage } = useMessage();
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [startMonth, setStartMonth] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(0);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [startMonthInvalid, setStartMonthInvalid] = useState(false);
  const [endMonthInvalid, setEndMonthInvalid] = useState(false);
  const [startMonthErrmsg, setStartMonthErrmsg] = useState("");
  const [endMonthErrmsg, setEndMonthErrmsg] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeStartMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setStartMonth(Number(e.target.value));

  const onChangeEndMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setEndMonth(Number(e.target.value));

  const onBlurName = () =>
    setNameInvalid(name === "");

  const onBlurCategory = () =>
    setCategoryInvalid(category === "");

  const onBlurStartMonth = () => {
    let status = false;
    let errmsg = "";
    if (!(startMonth >= 1 && startMonth <= 12)) {
      status = true;
      errmsg = "必須項目です。選択してください";
    } else if (startMonth > endMonth) {
      status = true;
      errmsg = "終了月よりも前の月を選択してください";
    }
    setStartMonthInvalid(status);
    setStartMonthErrmsg(errmsg);
  };

  const onBlurEndMonth = () => {
    let status = false;
    let errmsg = "";
    if (!(endMonth >= 1 && endMonth <= 12)) {
      status = true;
      errmsg = "必須項目です。選択してください";
    } else if (startMonth > endMonth) {
      status = true;
      errmsg = "開始月よりも後の月を選択してください";
    }
    setEndMonthInvalid(status);
    setEndMonthErrmsg(errmsg);
  };

  const initModal = () => {
    setId(seasonalFood?.id ?? 0);
    setName(seasonalFood?.name ?? "");
    setCategory(seasonalFood?.category ?? "");
    setStartMonth(seasonalFood?.start_month ?? 0);
    setEndMonth(seasonalFood?.end_month ?? 0);
  };

  const callAddSeasonalFood = () => {
    const addData = {
      id,
      name,
      category,
      start_month: startMonth,
      end_month: endMonth,
    };
    addSeasonalFood(addData)
      .then(() => {
        showMessage({ title: "登録に成功しました", status: "success" });
        initModal();
      })
      .catch(() => {
        showMessage({ title: "登録に失敗しました", status: "error" });
      });
  };

  const callEditSeasonalFood = () => {
    editSeasonalFood()
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    initModal();
  }, [seasonalFood]);
  const editType = (id === 0) ? "登録" : "編集";
  const buttonTitle = (id === 0) ? "登録" : "更新";
  const callFunction = (id === 0) ? callAddSeasonalFood : callEditSeasonalFood;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={`旬の食材${editType}`}
      buttonTitle={buttonTitle}
      loading={loading}
      onClick={callFunction}
    >
      <Stack spacing={4}>
        <DefaultInputForm
          label="食材名"
          require="require"
          isInvalid={nameInvalid}
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
          isInvalid={categoryInvalid}
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
              isInvalid={startMonthInvalid}
              errorMsg={startMonthErrmsg}
            >
              <SelectMonth
                selectedValue={startMonth}
                onChange={onChangeStartMonth}
                onBlur={onBlurStartMonth}
              />
            </DefaultInputForm>
          </Box>
          <Spacer />
          <Box w="40%">
            <DefaultInputForm
              label="終了月"
              require="require"
              isInvalid={endMonthInvalid}
              errorMsg={endMonthErrmsg}
            >
              <SelectMonth
                selectedValue={endMonth}
                onChange={onChangeEndMonth}
                onBlur={onBlurEndMonth}
              />
            </DefaultInputForm>
          </Box>
        </Flex>
      </Stack>
    </DefaultModal>
  );
});
