import { Box, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Password } from "../../molecules/input/Password";

export const UserSignin: VFC = memo(() => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onClickSignin = () => {
    alert("bbb");
  }

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Stack spacing={1} py={4} px={10}>
          <Heading as="h6" size="lg" textAlign="center">
            ログイン
          </Heading>
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
          <PrimaryButton onClick={onClickSignin}>ログイン</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
