import { ChangeEvent, memo, useState, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { RadioBarParam } from "../input/graph/RadioBarParam";
import { RadioLineParam } from "../input/graph/RadioLineParam";
import { InputEndDate } from "../input/graph/InputEndDate";
import { useMessage } from "../../../hooks/common/useMessage";
import { useGraphApi } from "../../../hooks/graph/useGraphApi";
import { useGraphValidate } from "../../../hooks/validate/useGraphValidate";
import { GraphDataType } from "../../../types/pages/graph/graphDataType";

type Props = {
  setGraphData: (graph: GraphDataType | null) => void;
  onClose: () => void;
};

export const GraphParamForm: VFC<Props> = memo((props) => {
  const [lineGraphParam, setLineGraphParam] = useState("weight");
  const [barGraphParam, setBarGraphParam] = useState("kcal");
  const [endDate, setEndDate] = useState("");
  const [endDateInvalid, setEndDateInvalid] = useState(false);
  const [endDateError, setEndDateError] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const { setGraphData, onClose } = props;
  const { showMessage } = useMessage();
  const { getGraphData } = useGraphApi();
  const { validateEndDate } = useGraphValidate();

  const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) =>
    setEndDate(e.target.value);

  const onBlurEndDate = () => {
    const { invalid, errorMsg } = validateEndDate(endDate);
    setEndDateInvalid(invalid);
    setEndDateError(errorMsg);
  };

  const onClickDrawButton = () => {
    setButtonLoading(true);
    getGraphData(lineGraphParam, barGraphParam, endDate)
      .then((res) => {
        setGraphData(res);
        onClose();
      })
      .catch(() => {
        showMessage({ title: "グラフデータの取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setButtonLoading(false);
      });
  };

  return (
    <Box>
      <RadioLineParam
        graphParam={lineGraphParam}
        onChange={setLineGraphParam}
      />
      <RadioBarParam
        graphParam={barGraphParam}
        onChange={setBarGraphParam}
      />
      <InputEndDate
        endDate={endDate}
        onChange={onChangeEndDate}
        invalid={endDateInvalid}
        error={endDateError}
        onBlur={onBlurEndDate}
      />
      <PrimaryButton
        loading={buttonLoading}
        onClick={onClickDrawButton}
      >
        描画
      </PrimaryButton>
    </Box>
  );
});
