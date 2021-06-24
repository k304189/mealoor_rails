import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputNickname } from "../input/user/InputNickname";
import { InputEmail } from "../input/user/InputEmail";
import { InputPassword } from "../input/user/InputPassword";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useUserValidate } from "../../../hooks/validate/useUserValidate";

export const SignupForm: VFC = memo(() => {
  const { signup } = useUserApi();
  const { validateNickname, validateEmail, validatePassword } = useUserValidate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [nicknameInvalid, setNicknameInvalid] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmationInvalid, setPasswordConfirmationInvalid] = useState(false);
  const [passwordConfirmationError, setPasswordConfirmationError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  const onBlurNickname = () => {
    const { invalid, errorMsg } = validateNickname(nickname);
    setNicknameInvalid(invalid);
    setNicknameError(errorMsg);
  };

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

  const onBlurPasswordConfirmation = () => {
    const { invalid, errorMsg } = validatePassword(passwordConfirmation);
    setPasswordConfirmationInvalid(invalid);
    setPasswordConfirmationError(errorMsg);
  };

  const validateAll = (): boolean => {
    onBlurNickname();
    onBlurEmail();
    onBlurPassword();
    onBlurPasswordConfirmation();
    return nicknameInvalid || emailInvalid || passwordInvalid || passwordConfirmationInvalid;
  };

  const onClickSignup = () => {
    if (!validateAll()) {
      setButtonLoading(true);
      const signupUser = {
        nickname,
        email,
        password,
        password_confirmation: passwordConfirmation,
      };
      signup(signupUser);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      nicknameInvalid || emailInvalid
      || passwordInvalid || passwordConfirmationInvalid,
    );
  }, [nicknameInvalid, emailInvalid, passwordInvalid, passwordConfirmationInvalid]);

  return (
    <VStack>
      <InputNickname
        nickname={nickname}
        onChange={onChangeNickname}
        invalid={nicknameInvalid}
        error={nicknameError}
        onBlur={onBlurNickname}
      />
      <InputEmail
        require="require"
        email={email}
        onChange={onChangeEmail}
        invalid={emailInvalid}
        error={emailError}
        onBlur={onBlurEmail}
      />
      <InputPassword
        require="require"
        password={password}
        onChange={onChangePassword}
        invalid={passwordInvalid}
        error={passwordError}
        onBlur={onBlurPassword}
      />
      <InputPassword
        label="パスワード(確認用)"
        require="require"
        password={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
        invalid={passwordConfirmationInvalid}
        error={passwordConfirmationError}
        onBlur={onBlurPasswordConfirmation}
      />
      <Flex w="100%" justify="flex-end">
        <PrimaryButton
          onClick={onClickSignup}
          loading={buttonLoading}
          disabled={buttonDisabled}
        >
          サインアップ
        </PrimaryButton>
      </Flex>
    </VStack>
  );
});
