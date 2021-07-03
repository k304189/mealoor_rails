import {
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { ChangeEvent, memo, useEffect, useState, VFC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { InputName } from "../input/common/InputName";
import { SelectFoodCategory } from "../input/common/SelectFoodCategory";
import { SelectMonth } from "../input/seasonalfood/SelectMonth";
import { useCommonValidate } from "../../../hooks/validate/useCommonValidate";
import { useSeasonalFoodValidate } from "../../../hooks/validate/useSeasonalFoodValidate";
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
  const { validateName, validateFoodCategory } = useCommonValidate();
  const { validateMonth } = useSeasonalFoodValidate();
  const { showMessage } = useMessage();

  const [id, setId] = useState<number>(0);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(0);

  const [nameInvalid, setNameInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [startMonthInvalid, setStartMonthInvalid] = useState(false);
  const [endMonthInvalid, setEndMonthInvalid] = useState(false);

  const [nameError, setNameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [startMonthError, setStartMonthError] = useState("");
  const [endMonthError, setEndMonthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onChangeCategory = (e: ChangeEvent<HTMLSelectElement>) =>
    setCategory(e.target.value);

  const onChangeStartMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setStartMonth(Number(e.target.value));

  const onChangeEndMonth = (e: ChangeEvent<HTMLSelectElement>) =>
    setEndMonth(Number(e.target.value));

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

  const onBlurStartMonth = () => {
    const { startMonthStatus, startMonthErrmsg } = validateMonth(startMonth, endMonth);
    if (!startMonthStatus) {
      setEndMonthInvalid(false);
      setEndMonthError("");
    }
    setStartMonthInvalid(startMonthStatus);
    setStartMonthError(startMonthErrmsg);
  };

  const onBlurEndMonth = () => {
    const { endMonthStatus, endMonthErrmsg } = validateMonth(startMonth, endMonth);
    if (!endMonthStatus) {
      setStartMonthInvalid(false);
      setStartMonthError("");
    }
    setEndMonthInvalid(endMonthStatus);
    setEndMonthError(endMonthErrmsg);
  };

  const initModal = () => {
    setId(seasonalFood?.id ?? 0);
    setName(seasonalFood?.name ?? "");
    setCategory(seasonalFood?.category ?? "");
    setStartMonth(seasonalFood?.start_month ?? 0);
    setEndMonth(seasonalFood?.end_month ?? 0);
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
    setButtonDisabled(nameInvalid || categoryInvalid || startMonthInvalid || endMonthInvalid);
  }, [nameInvalid, categoryInvalid, startMonthInvalid, endMonthInvalid]);

  const editType = (id === 0) ? "登録" : "編集";
  const buttonTitle = (id === 0) ? "登録" : "更新";
  const callFunction = (id === 0) ? callAddSeasonalFood : callEditSeasonalFood;

  return (
    <DefaultModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={`旬の食材${editType}`}
    >
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={5}
      >
        <GridItem colSpan={2}>
          <InputName
            name={name}
            onChange={onChangeName}
            invalid={nameInvalid}
            error={nameError}
            onBlur={onBlurName}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <SelectFoodCategory
            category={category}
            onChange={onChangeCategory}
            invalid={categoryInvalid}
            error={categoryError}
            onBlur={onBlurCategory}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SelectMonth
            label="開始月"
            month={startMonth}
            onChange={onChangeStartMonth}
            invalid={startMonthInvalid}
            error={startMonthError}
            onBlur={onBlurStartMonth}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <SelectMonth
            label="終了月"
            month={endMonth}
            onChange={onChangeEndMonth}
            invalid={endMonthInvalid}
            error={endMonthError}
            onBlur={onBlurEndMonth}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Flex justify="flex-end">
            <PrimaryButton
              disabled={buttonDisabled}
              loading={loading}
              onClick={callFunction}
            >
              {buttonTitle}
            </PrimaryButton>
          </Flex>
        </GridItem>
      </Grid>
    </DefaultModal>
  );
});
