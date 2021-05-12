import { memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  remain: number;
  onChange?: (v: number) => void;
};

export const InputRemain: VFC<Props> = memo((props) => {
  const { remain, onChange = () => {} } = props;

  return (
    <DefaultInputForm
      label="残量"
      isReadOnly
    >
      <DefaultNumberInput
        value={remain}
        onChange={onChange}
        max={100}
        unit="%"
      />
    </DefaultInputForm>
  );
});
