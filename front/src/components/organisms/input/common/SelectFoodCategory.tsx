import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "../DefaultInputForm";
import { FoodCategory } from "../../../molecules/select/FoodCategory";

type Props = {
  category: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  invalid: boolean;
  error: string;
  size?: "xs" | "sm" | "md" | "lg";
  onBlur: () => void;
};

export const SelectFoodCategory: VFC<Props> = memo((props) => {
  const { category, onChange, invalid, error, size = "md", onBlur } = props;

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
        size={size}
      />
    </DefaultInputForm>
  );
});
