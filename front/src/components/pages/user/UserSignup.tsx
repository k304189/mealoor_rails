import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FocusEvent, memo, useState, VFC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Password } from "../../molecules/input/Password";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SignoutHeaderLayout } from "../../templates/SignoutHeaderLayout";
import { useUserSignup } from "../../../hooks/user/useUserSignup";
import { useCheckEmail } from "../../../hooks/user/useCheckEmail";

export const UserSignup: VFC = memo(() => {
  const [ nickname, setNickname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
  const [ emailValid, setEmailValid ] = useState(true);
  const { signup } = useUserSignup();
  const { checkEmail } = useCheckEmail();

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onBlurEmail = (e: FocusEvent<HTMLInputElement>) =>
    setEmailValid(checkEmail(email));

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  const onClickSignup = () => {
    const signupUser = {
      nickname: nickname,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    };
    signup(signupUser);
  };

  return (
    <SignoutHeaderLayout>
      <Flex align="center" justify="center" height="100vh">
        <Box as="article" w="sm" p={4}>
          <Stack spacing={2} py={4} px={10}>
            <Box>
              <Text fontSize="xs">ニックネーム</Text>
              <DefaultInput
                placeholder="ニックネーム"
                value={nickname}
                onChange={onChangeNickname}
              />
            </Box>

            <Box>
              <Text fontSize="xs">メールアドレス</Text>
              <DefaultInput
                placeholder="メールアドレス"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
              <Text fontSize="xs" color="red">
                {emailValid ? "" : "メールアドレスが不正です"}
              </Text>
            </Box>

            <Box>
              <Text fontSize="xs">パスワード</Text>
              <Password
                value={password}
                onChange={onChangePassword}
                placeholder="パスワード"
              />
            </Box>

            <Box>
              <Text fontSize="xs">パスワード（確認用）</Text>
              <Password
                value={passwordConfirmation}
                onChange={onChangePasswordConfirmation}
                placeholder="パスワード（確認用）"
              />
            </Box>

            <PrimaryButton onClick={onClickSignup}>サインアップ</PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </SignoutHeaderLayout>
  );
});
