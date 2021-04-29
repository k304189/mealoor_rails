import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Password } from "../../molecules/input/Password";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SignoutHeaderLayout } from "../../templates/SignoutHeaderLayout";
import { useUserSignin } from "../../../hooks/user/useUserSignin";

import { useLogin } from "../../../hooks/user/useLogin";

export const UserSignin: VFC = memo(() => {
  const { loginUser } = useLogin();
  console.log(localStorage);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useUserSignin();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onClickSignin = () => {
    const signinUser = {
      email,
      password,
    };
    signin(signinUser);
  };

  return (
    <SignoutHeaderLayout>
      <Flex align="center" justify="center" height="100vh">
        <Box as="article" w="sm" p={4}>
          <Stack spacing={2} py={4} px={10}>
            <Box>
              <Text fontSize="xs">メールアドレス</Text>
              <DefaultInput
                placeholder="メールアドレス"
                value={email}
                onChange={onChangeEmail}
              />
            </Box>

            <Box>
              <Text fontSize="xs">パスワード</Text>
              <Password
                value={password}
                onChange={onChangePassword}
              />
            </Box>
            <PrimaryButton onClick={onClickSignin}>ログイン</PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </SignoutHeaderLayout>
  );
});
