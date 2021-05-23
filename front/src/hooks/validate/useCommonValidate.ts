import { useCallback } from "react";

type returnType = {
  validateName: (name: string) => { invalid: boolean, errorMsg: string };
  validateFoodCategory: (category: string) => { invalid: boolean, errorMsg: string };
  validateShop: (shop: string) => { invalid: boolean, errorMsg: string };
  validateNote: (note: string) => { invalid: boolean, errorMsg: string };
};

export const useCommonValidate = (): returnType => {
  const validateName = useCallback((name: string) => {
    const allowNameLength = 30;
    let invalid = false;
    let errorMsg = "";
    if (name === "") {
      invalid = true;
      errorMsg = "名前は必須項目です";
    } else if (name.length > allowNameLength) {
      invalid = true;
      errorMsg = `名前は${allowNameLength}文字までです`;
    }
    return { invalid, errorMsg };
  }, []);

  const validateFoodCategory = useCallback((category: string) => {
    let invalid = false;
    let errorMsg = "";
    if (category === "") {
      invalid = true;
      errorMsg = "カテゴリーは必須項目です";
    }
    return { invalid, errorMsg };
  }, []);

  const validateShop = useCallback((shop: string) => {
    const allowShopLength = 40;
    let invalid = false;
    let errorMsg = "";
    if (shop.length > allowShopLength) {
      invalid = true;
      errorMsg = `店名は${allowShopLength}文字までです`;
    }
    return { invalid, errorMsg };
  }, []);

  const validateNote = useCallback((note: string) => {
    const allowNoteLength = 50;
    let invalid = false;
    let errorMsg = "";
    if (note.length > allowNoteLength) {
      invalid = true;
      errorMsg = `一言メモは${allowNoteLength}文字までです`;
    }
    return { invalid, errorMsg };
  }, []);
  return { validateName, validateFoodCategory, validateShop, validateNote };
};
