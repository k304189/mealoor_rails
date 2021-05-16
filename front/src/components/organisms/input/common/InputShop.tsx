import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { DefaultInput } from "../../../atoms/input/DefaultInput";

type Props = {
  shop: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  invalid: boolean;
  error: string;
  onBlur: () => void;
};

export const InputShop: VFC<Props> = memo((props) => {
  const { shop, onChange, invalid, error, onBlur } = props;

  return (
    <DefaultInputForm
      require="optional"
      label="店名"
      isInvalid={invalid}
      errorMsg={error}
    >
      <DefaultInput
        value={shop}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultInputForm>
  );
});
