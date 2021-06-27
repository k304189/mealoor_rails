import { ChangeEvent, memo, useState, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { RadioGraphParam } from "../input/graph/RadioGraphParam";
import { InputEndDate } from "../input/graph/InputEndDate";
import { useGraphValidate } from "../../../hooks/validate/useGraphValidate";

export const GraphParamForm: VFC = memo(() => {
  const [lineGraphParam, setLineGraphParam] = useState("weight");
  const [boxGraphParam, setBoxGraphParam] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateInvalid, setEndDateInvalid] = useState(false);
  const [endDateError, setEndDateError] = useState("");

  const { validateEndDate } = useGraphValidate();

  const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) =>
    setEndDate(e.target.value);

  const onBlurEndDate = () => {
    const { invalid, errorMsg } = validateEndDate(endDate);
    setEndDateInvalid(invalid);
    setEndDateError(errorMsg);
  };

  return (
    <Box>
      <RadioGraphParam
        label="線グラフ"
        require="require"
        graphParam={lineGraphParam}
        onChange={setLineGraphParam}
      />
      <RadioGraphParam
        label="棒グラフ"
        require="optional"
        graphParam={boxGraphParam}
        onChange={setBoxGraphParam}
      />
      <InputEndDate
        endDate={endDate}
        onChange={onChangeEndDate}
        invalid={endDateInvalid}
        error={endDateError}
        onBlur={onBlurEndDate}
      />
      <PrimaryButton
        onClick={() => {}}
      >
        描画
      </PrimaryButton>
    </Box>
  );
});
