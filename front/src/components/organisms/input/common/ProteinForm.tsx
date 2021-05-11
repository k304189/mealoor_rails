import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultNumberInput } from "../../../molecules/input/DefaultNumberInput";

type Props = {
  protein: number;
  onChange: (v: number) => void;
};

export const ProteinForm: VFC<Props> = memo((props) => {
  const { protein, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="タンパク質"
    >
      <DefaultNumberInput
        value={protein}
        onChange={onChange}
        unit="g"
        step={0.1}
        precision={1}
      />
    </DefaultInputForm>
  );
});
