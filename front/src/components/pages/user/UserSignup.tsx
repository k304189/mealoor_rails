import { Box, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Password } from "../../molecules/input/Password";

export const UserSignup: VFC = memo(() => {
  const [ nickname, setNickname ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirmation, setPasswordConfirmation ] = useState("");

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  const onClickSignup = () => {
    alert("aaa");
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h6" size="lg" textAlign="center">
          ユーザー登録
        </Heading>
        <Stack spacing={1} py={4} px={10}>
          <Text fontSize="xs">ニックネーム</Text>
          <Input
            placeholder="ニックネーム"
            value={nickname}
            onChange={onChangeNickname}
            variant="flushed"
          />

          <Text fontSize="xs" mt={5}>メールアドレス</Text>
          <Input
            placeholder="メールアドレス"
            value={email}
            onChange={onChangeEmail}
            variant="flushed"
          />

          <Text fontSize="xs" mt={5}>パスワード</Text>
          <Password
            value={password}
            onChange={onChangePassword}
            placeholder="パスワード"
          />

          <Text fontSize="xs" mt={5}>パスワード</Text>
          <Password
            value={passwordConfirmation}
            onChange={onChangePasswordConfirmation}
            placeholder="パスワード（確認用）"
          />

          <PrimaryButton onClick={onClickSignup}>SignUp</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
