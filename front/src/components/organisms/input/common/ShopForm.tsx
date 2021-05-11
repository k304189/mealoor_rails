import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  shop: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ShopForm: VFC<Props> = memo((props) => {
  const { shop, onChange } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="店名"
    >
      <DefaultInput
        value={shop}
        onChange={onChange}
      />
    </DefaultInputForm>
  );
});
