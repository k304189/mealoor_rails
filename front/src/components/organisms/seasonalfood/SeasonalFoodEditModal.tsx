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
  allSeasonalFoods: Array<SeasonalFood>;
  seasonalFood?: SeasonalFood | null;
  isOpen: boolean;
  onClose: () => void;
};

export const SeasonalFoodEditModal: VFC<Props> = memo((props) => {
  const { allSeasonalFoods, seasonalFood = null, isOpen, onClose } = props;
  const { addSeasonalFood, editSeasonalFood } = useSeasonalFoodApi();
  const { showMessage } = useMessage();
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [startMonth, setStartMonth] = useState<number>(0);
  const [endMonth, setEndMonth] = useState<number>(0);
  const [nameInvalid, setNameInvalid] = useState<boolean>();
  const [categoryInvalid, setCategoryInvalid] = useState<boolean>();
  const [startMonthInvalid, setStartMonthInvalid] = useState<boolean>();
  const [endMonthInvalid, setEndMonthInvalid] = useState<boolean>();
  const [startMonthErrmsg, setStartMonthErrmsg] = useState("");
  const [endMonthErrmsg, setEndMonthErrmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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
    } else if (startMonthInvalid !== undefined || endMonthInvalid !== undefined) {
      if (startMonth > endMonth) {
        status = true;
        errmsg = "終了月よりも前の月を選択してください";
      } else {
        setEndMonthInvalid(false);
        setEndMonthErrmsg("");
      }
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
    } else if (startMonthInvalid !== undefined || endMonthInvalid !== undefined) {
      if (startMonth > endMonth) {
        status = true;
        errmsg = "開始月よりも後の月を選択してください";
      } else {
        setStartMonthInvalid(false);
        setStartMonthErrmsg("");
      }
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
    let isInValidStatus;
    if (seasonalFood) {
      isInValidStatus = false;
    }
    setNameInvalid(isInValidStatus);
    setCategoryInvalid(isInValidStatus);
    setStartMonthInvalid(isInValidStatus);
    setEndMonthInvalid(isInValidStatus);
  };

  const callAddSeasonalFood = () => {
    setLoading(true);
    const addData = {
      id,
      name,
      category,
      start_month: startMonth,
      end_month: endMonth,
    };
    addSeasonalFood(allSeasonalFoods, addData)
      .then(() => {
        showMessage({ title: "登録に成功しました", status: "success" });
        initModal();
      })
      .catch(() => {
        showMessage({ title: "登録に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const callEditSeasonalFood = () => {
    setLoading(true);
    const editData = {
      id,
      name,
      category,
      start_month: startMonth,
      end_month: endMonth,
    };
    editSeasonalFood(allSeasonalFoods, editData)
      .then(() => {
        showMessage({ title: "更新に成功しました", status: "success" });
      })
      .catch(() => {
        showMessage({ title: "更新に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    initModal();
  }, [seasonalFood]);

  useEffect(() => {
    let disabled;
    if (
      nameInvalid === undefined || categoryInvalid === undefined
      || startMonthInvalid === undefined || endMonthInvalid === undefined
    ) {
      disabled = true;
    } else {
      disabled = nameInvalid || categoryInvalid || startMonthInvalid || endMonthInvalid;
    }
    setButtonDisabled(disabled);
  }, [nameInvalid, categoryInvalid, startMonthInvalid, endMonthInvalid]);

  const editType = (id === 0) ? "登録" : "編集";
  const buttonTitle = (id === 0) ? "登録" : "更新";
  const callFunction = (id === 0) ? callAddSeasonalFood : callEditSeasonalFood;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={`旬の食材${editType}`}
      buttonTitle={buttonTitle}
      buttonDisabled={buttonDisabled}
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
