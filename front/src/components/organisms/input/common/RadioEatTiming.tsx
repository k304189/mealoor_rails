import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  eatTiming? : string;
  size? : "sm" | "md" | "lg";
  onChange: (v: string) => void;
};

export const RadioEatTiming:VFC<Props> = memo((props) => {
  const { eatTiming = "", size = "md", onChange } = props;
  const buttons = [
    { value: "朝食" },
    { value: "昼食" },
    { value: "夕食" },
    { value: "間食" },
  ];
  return (
    <DefaultInputForm
      label="区分"
      require="require"
    >
      <DefaultRadio
        value={eatTiming}
        onChange={onChange}
        buttons={buttons}
        size={size}
      />
    </DefaultInputForm>
  );
});
