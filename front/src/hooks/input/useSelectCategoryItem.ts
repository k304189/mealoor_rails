import { ChangeEvent, useCallback, useState } from "react";

type returnType = {
  category: string;
  categoryInvalid: boolean;
  categoryErrmsg: string;
  onChangeCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  validateCategory: (checkCategory: string) => void;
};

export const useSelectCategoryItem = (): returnType => {
  const [category, setCategory] = useState("");
  const [categoryInvalid, setCategoryInvalid] = useState(false);
  const [categoryErrmsg, setCategoryErrmsg] = useState("");

  const onChangeCategory = useCallback(
    (e:ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value), [],
  );

  const validateCategory = useCallback(
    (checkCategory: string) => {
      let errmsg = "";
      let invalid = false;
      if (checkCategory === "") {
        errmsg = "必須項目です。選択してください";
        invalid = true;
      } else if (checkCategory.length > 30) {
        errmsg = "カテゴリーは30文字までです。設定値を見直ししてください";
        invalid = true;
      }
      setCategoryErrmsg(errmsg);
      setCategoryInvalid(invalid);
    }, [],
  );

  return {
    category,
    categoryInvalid,
    categoryErrmsg,
    onChangeCategory,
    validateCategory,
  };
};
