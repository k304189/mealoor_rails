import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  recordingDate: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void;
};

export const InputRecordingDate: VFC<Props> = memo((props) => {
  const { recordingDate, onChange, invalid, error, size = "md", onBlur } = props;

  return (
    <DefaultInputForm
      require="require"
      label="記録日"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        type="date"
        value={recordingDate}
        onChange={onChange}
        onBlur={onBlur}
        size={size}
      />
    </DefaultInputForm>
  );
});
