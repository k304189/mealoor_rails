import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputPassword } from "../input/user/InputPassword";

import { useUserApi } from "../../../hooks/user/useUserApi";
import { useUserValidate } from "../../../hooks/validate/useUserValidate";
import { useMessage } from "../../../hooks/common/useMessage";

type Props = {
  userId?: number;
};

export const ChangePasswordForm: VFC<Props> = memo((props) => {
  const { userId = 0 } = props;
  const { editUser } = useUserApi();
  const { showMessage } = useMessage();
  const { validatePassword } = useUserValidate();

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationInvalid, setPasswordConfirmationInvalid] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoding, setButtonLoding] = useState(false);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  const onBlurPassword = () => {
    const { invalid, errorMsg } = validatePassword(password);
    setPasswordInvalid(invalid);
    setPasswordError(errorMsg);
  };

  const onBlurPasswordConfirmation = () => {
    const { invalid, errorMsg } = validatePassword(passwordConfirmation);
    setPasswordConfirmationInvalid(invalid);
    setPasswordConfirmationError(errorMsg);
  };

  const validateAll = (): boolean => {
    onBlurPassword();
    onBlurPasswordConfirmation();
    return passwordInvalid || passwordConfirmationInvalid;
  };

  const getUpdatePassword = () => {
    return {
      password,
      password_confirmation: passwordConfirmation,
    };
  };

  const onClickChangePassword = () => {
    if (validateAll()) {
      return;
    }
    if (password !== passwordConfirmation) {
      showMessage({
        title: "???????????????????????????????????????????????????????????????????????????????????????",
        status: "error",
      });
      return;
    }
    setButtonLoding(true);
    const passwordData = getUpdatePassword();
    editUser(userId, passwordData)
      .then(() => {
        showMessage({ title: "????????????????????????????????????", status: "success" });
      })
      .catch(() => {
        showMessage({ title: "??????????????????????????????????????????", status: "error" });
      })
      .finally(() => {
        setButtonLoding(false);
      });
  };

  useEffect(() => {
    setButtonDisabled(passwordInvalid || passwordConfirmationInvalid);
  }, [passwordInvalid, passwordConfirmationInvalid]);

  return (
    <VStack spacing={4}>
      <InputPassword
        label="???????????????????????????"
        require="require"
        password={password}
        onChange={onChangePassword}
        invalid={passwordInvalid}
        error={passwordError}
        onBlur={onBlurPassword}
      />
      <InputPassword
        label="???????????????????????????(?????????)"
        require="require"
        password={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
        invalid={passwordConfirmationInvalid}
        error={passwordConfirmationError}
        onBlur={onBlurPasswordConfirmation}
      />
      <Flex w="100%" justify="flex-end">
        <PrimaryButton
          loading={buttonLoding}
          disabled={buttonDisabled}
          onClick={onClickChangePassword}
        >
          ??????
        </PrimaryButton>
      </Flex>
    </VStack>
  );
});
