import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  note: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputNote: VFC<Props> = memo((props) => {
  const { note, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="一言メモ"
    >
      <DefaultInput
        value={note}
        onChange={onChange}
      />
    </DefaultInputForm>
  );
});
