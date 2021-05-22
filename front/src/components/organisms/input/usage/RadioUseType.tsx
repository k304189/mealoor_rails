import { memo, VFC } from "react";

import { DefaultRadio } from "../../../atoms/button/DefaultRadio";
import { DefaultInputForm } from "../DefaultInputForm";

type Props = {
  useType? : string;
  size? : "sm" | "md" | "lg";
  onChange: (v: string) => void;
};

export const RadioUseType:VFC<Props> = memo((props) => {
  const { useType = "", size = "md", onChange } = props;
  const buttons = [
    { value: "食事" },
    { value: "処分" },
    { value: "分割" },
    { value: "料理" },
  ];
  return (
    <DefaultInputForm
      label="区分"
      require="require"
    >
      <DefaultRadio
        value={useType}
        onChange={onChange}
        buttons={buttons}
        size={size}
      />
    </DefaultInputForm>
  );
});
