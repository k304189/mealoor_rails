import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";

import { useHealthApi } from "../../../hooks/health/useHealthApi";
import { useMessage } from "../../../hooks/common/useMessage";
import { useHealthValidate } from "../../../hooks/validate/useHealthValidate";
import { Health } from "../../../types/api/health";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputRecordingDate } from "../input/health/InputRecordingDate";
import { InputWeight } from "../input/health/InputWeight";
import { InputFatPercent } from "../input/health/InputFatPercent";
import { InputFatWeight } from "../input/health/InputFatWeight";

type Props = {
  health?: Health | null;
  setHealthData: (health: Health) => void;
}

export const HealthEditForm: VFC<Props> = memo((props) => {
  const { health = null, setHealthData } = props;
  const { showMessage } = useMessage();
  const { addHealth, editHealth, getHealthByDate } = useHealthApi();
  const { validateRecordingDate } = useHealthValidate();

  const [targetHealth, setTargetHealth] = useState<Health | null>(health);
  const [id, setId] = useState(0);
  const [recordingDate, setRecordingDate] = useState("");
  const [weight, setWeight] = useState(0);
  const [fatPercent, setFatPercent] = useState(0);
  const [fatWeight, setFatWeight] = useState(0);

  const [recordingDateInvaid, setRecordingDateInvalid] = useState(false);
  const [recordingDateError, setRecordingDateError] = useState("");

  const [buttonTitle, setButtonTitle] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onChangeRecordingDate = (e: ChangeEvent<HTMLInputElement>) => {
    setRecordingDate(e.target.value);
  };

  const onBlurRecordingDate = () => {
    const { invalid, errorMsg } = validateRecordingDate(recordingDate);
    setRecordingDateInvalid(invalid);
    setRecordingDateError(errorMsg);
    if (!invalid) {
      getHealthByDate(recordingDate)
        .then((res) => {
          setTargetHealth(res);
        })
        .catch(() => {
          showMessage({ title: "サーバーへの通信が失敗し、データの確認ができませんでした", status: "error" });
        });
    } else {
      setTargetHealth(null);
    }
  };

  const getHealthApiData = () => {
    return {
      id,
      weight,
      recording_date: recordingDate,
      fat_percent: fatPercent,
    };
  };

  const initModal = () => {
    let tmpRecordingDate = targetHealth?.recording_date ?? "";
    if (!tmpRecordingDate && recordingDate) {
      tmpRecordingDate = recordingDate;
    }

    setId(targetHealth?.id ?? 0);
    setRecordingDate(tmpRecordingDate);
    setWeight(targetHealth?.weight ?? 0);
    setFatPercent(targetHealth?.fat_percent ?? 0);
    setFatWeight(targetHealth?.fat_weight ?? 0);

    let title = "登録";
    if (targetHealth) {
      title = "更新";
    }
    setButtonTitle(title);
  };

  const onClickModalButton = () => {
    setButtonLoading(true);
    const apiData = getHealthApiData();
    let execType: string;
    let callFunction: (data: Health) => Promise<Health>;
    if (id === 0) {
      callFunction = addHealth;
      execType = "登録";
    } else {
      callFunction = editHealth;
      execType = "更新";
    }
    callFunction(apiData)
      .then((res) => {
        showMessage({ title: `${execType}に成功しました`, status: "success" });
        setHealthData(res);
        setTargetHealth(res);
      })
      .catch(() => {
        showMessage({ title: `${execType}に失敗しました`, status: "error" });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  useEffect(() => {
    setButtonDisabled(recordingDateInvaid);
  }, [recordingDateInvaid]);

  useEffect(() => {
    initModal();
  }, [targetHealth]);

  return (
    <>
      <Grid
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(6, 1fr)"
      >
        <GridItem rowStart={1} colSpan={3}>
          <InputRecordingDate
            recordingDate={recordingDate}
            onChange={onChangeRecordingDate}
            invalid={recordingDateInvaid}
            error={recordingDateError}
            onBlur={onBlurRecordingDate}
          />
        </GridItem>
        <GridItem rowStart={2} colSpan={2}>
          <InputWeight
            weight={weight}
            onChange={setWeight}
          />
        </GridItem>
        <GridItem rowStart={2} colSpan={2}>
          <InputFatPercent
            fatPercent={fatPercent}
            onChange={setFatPercent}
          />
        </GridItem>
        <GridItem rowStart={2} colSpan={2}>
          <InputFatWeight
            fatWeight={fatWeight}
            onChange={setFatWeight}
          />
        </GridItem>
        <GridItem h="100%" rowStart={3} colStart={6} alignItems="end">
          <Flex h="100%" align="end" justify="flex-end">
            <PrimaryButton
              disabled={buttonDisabled}
              loading={buttonLoading}
              onClick={onClickModalButton}
            >
              {buttonTitle}
            </PrimaryButton>
          </Flex>
        </GridItem>
      </Grid>
    </>
  );
});
