import { ChangeEvent, useCallback, useState } from "react";

type returnType = {
  name: string;
  nameInvalid: boolean;
  nameErrmsg: string;
  onChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  validateName: (checkName: string) => void;
};

export const useInputNameItem = (): returnType => {
  const [name, setName] = useState("");
  const [nameInvalid, setNameInvalid] = useState(false);
  const [nameErrmsg, setNameErrmsg] = useState("");

  const onChangeName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value), [],
  );

  const validateName = useCallback(
    (checkName: string) => {
      let errmsg = "";
      let invalid = false;
      if (checkName === "") {
        errmsg = "必須項目です。入力してください";
        invalid = true;
      } else if (checkName.length > 30) {
        errmsg = `名前は30文字までです。現在${checkName.length}文字`;
        invalid = true;
      }
      setNameErrmsg(errmsg);
      setNameInvalid(invalid);
    }, [],
  );

  return { name, nameInvalid, nameErrmsg, onChangeName, validateName };
};
