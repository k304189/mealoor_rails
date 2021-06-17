import { ChangeEvent, memo, useState, VFC } from "react";
import { Grid, GridItem } from "@chakra-ui/react";

import { useMessage } from "../../../hooks/common/useMessage";
import { Health } from "../../../types/api/health";

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

  const [recordingDate, setRecordingDate] = useState("");
  const [weight, setWeight] = useState(0);
  const [fatPercent, setFatPercent] = useState(0);
  const [fatWeight, setFatWeight] = useState(0);

  const onChangeRecordingDate = (e: ChangeEvent<HTMLInputElement>) => {
    setRecordingDate(e.target.value);
  };

  return (
    <>
      <Grid
        templateColumns="repeat(6, 1fr)"
      >
        <GridItem colSpan={6}>
          <InputRecordingDate
            recordingDate={recordingDate}
            onChange={onChangeRecordingDate}
            invalid={false}
            error="テスト"
            onBlur={() => {}}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputWeight
            weight={weight}
            onChange={setWeight}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputFatPercent
            fatPercent={fatPercent}
            onChange={setFatPercent}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <InputFatWeight
            fatWeight={fatWeight}
            onChange={setFatWeight}
          />
        </GridItem>
      </Grid>
    </>
  );
});
