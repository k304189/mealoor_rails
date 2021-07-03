import { useCallback } from "react";

type returnType = {
  validateMonth: (
    startMonth: number, endMonth: number
  ) => {
    startMonthStatus: boolean, startMonthErrmsg: string,
    endMonthStatus: boolean, endMonthErrmsg: string,
  };
};

export const useSeasonalFoodValidate = (): returnType => {
  const validateMonth = useCallback((startMonth: number, endMonth: number) => {
    let startMonthStatus = false;
    let startMonthErrmsg = "";
    let endMonthStatus = false;
    let endMonthErrmsg = "";
    if (!(startMonth >= 1 && startMonth <= 12)) {
      startMonthStatus = true;
      startMonthErrmsg = "必須項目です。選択してください";
    } else if (startMonth > endMonth) {
      startMonthStatus = true;
      startMonthErrmsg = "終了月よりも前の月を選択してください";
    }

    if (!(endMonth >= 1 && endMonth <= 12)) {
      endMonthStatus = true;
      endMonthErrmsg = "必須項目です。選択してください";
    } else if (startMonth > endMonth) {
      endMonthStatus = true;
      endMonthErrmsg = "開始月よりも後の月を選択してください";
    }
    return { startMonthStatus, startMonthErrmsg, endMonthStatus, endMonthErrmsg };
  }, []);
  return { validateMonth };
};
