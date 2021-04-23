import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { Password } from "../../molecules/input/Password";
import { DefaultInput } from "../../atoms/input/DefaultInput";
import { SignoutHeaderLayout } from "../../templates/SignoutHeaderLayout";

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
    <SignoutHeaderLayout>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
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
