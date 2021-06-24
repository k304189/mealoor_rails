import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputEmail } from "../input/user/InputEmail";
import { InputPassword } from "../input/user/InputPassword";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useUserValidate } from "../../../hooks/validate/useUserValidate";

export const SigninForm: VFC = memo(() => {
  const { signin } = useUserApi();
  const { validateEmail, validatePassword } = useUserValidate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onBlurEmail = () => {
    const { invalid, errorMsg } = validateEmail(email);
    setEmailInvalid(invalid);
    setEmailError(errorMsg);
  };

  const onBlurPassword = () => {
    const { invalid, errorMsg } = validatePassword(password);
    setPasswordInvalid(invalid);
    setPasswordError(errorMsg);
  };

  const validateAll = (): boolean => {
    onBlurEmail();
    onBlurPassword();
    return emailInvalid || passwordInvalid;
  };

  const onClickSignin = () => {
    if (!validateAll()) {
      setButtonLoading(true);
      const signinUser = {
        email,
        password,
      };
      signin(signinUser);
    }
  };

  useEffect(() => {
    setButtonDisabled(emailInvalid || passwordInvalid);
  }, [emailInvalid, passwordInvalid]);

  return (
    <VStack>
      <InputEmail
        email={email}
        onChange={onChangeEmail}
        invalid={emailInvalid}
        error={emailError}
        onBlur={onBlurEmail}
      />
      <InputPassword
        password={password}
        onChange={onChangePassword}
        invalid={passwordInvalid}
        error={passwordError}
        onBlur={onBlurPassword}
      />
      <Flex w="100%" justify="flex-end">
        <PrimaryButton
          onClick={onClickSignin}
          loading={buttonLoading}
          disabled={buttonDisabled}
        >
          サインイン
        </PrimaryButton>
      </Flex>
    </VStack>
  );
});
