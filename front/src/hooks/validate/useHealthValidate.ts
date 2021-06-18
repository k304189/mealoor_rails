import { useCallback } from "react";

type returnType = {
  validateRecordingDate: (recordingDate: string) => { invalid: boolean, errorMsg: string};
};

export const useHealthValidate = (): returnType => {
  const validateRecordingDate = useCallback((recordingDate: string) => {
    let invalid = false;
    let errorMsg = "";
    if (recordingDate === "") {
      invalid = true;
      errorMsg = "記録日は必須項目です";
    }
    return { invalid, errorMsg };
  }, []);
  return { validateRecordingDate };
};
