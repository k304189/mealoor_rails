import { ChangeEvent, memo, VFC } from "react";

import { DefaultInputForm } from "./DefaultInputForm";
import { SelectCategory } from "../../molecules/select/SelectCategory";

type Props = {
  category: string;
  onChangeCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlurCategory?: () => void;
  label?: string;
  isInvalid?: boolean;
  errorMsg?: string;
};

export const SelectCategoryForm: VFC<Props> = memo((props) => {
  const {
    category,
    onChangeCategory,
    onBlurCategory = () => {},
    label = "カテゴリー",
    isInvalid = false,
    errorMsg = "",
  } = props;

  return (
    <DefaultInputForm
      label={label}
      require="require"
      isInvalid={isInvalid}
      errorMsg={errorMsg}
    >
      <SelectCategory
        selectedValue={category}
        onChange={onChangeCategory}
        onBlur={onBlurCategory}
      />
    </DefaultInputForm>
  );
});
