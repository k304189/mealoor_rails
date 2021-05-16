import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { FoodCategory } from "../../../molecules/select/FoodCategory";

type Props = {
  category: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  invalid: boolean;
  error: string;
  onBlur: () => void;
};

export const SelectFoodCategory: VFC<Props> = memo((props) => {
  const { category, onChange, invalid, error, onBlur } = props;

  return (
    <DefaultInputForm
      label="カテゴリー"
      require="require"
      isInvalid={invalid}
      errorMsg={error}
    >
      <FoodCategory
        selectedValue={category}
        onChange={onChange}
        onBlur={onBlur}
      />
    </DefaultInputForm>
  );
});
