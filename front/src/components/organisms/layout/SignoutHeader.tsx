import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";

import { HeaderLink } from "../../atoms/layout/HeaderLink";

export const SignoutHeader: VFC = memo(() => {
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickSignin = useCallback(
    () => history.push("/signin"),
    [],
  );
  const onClickSignup = useCallback(() => history.push("/signup"), []);
  return (
    <Flex
      as="header"
      align="center"
      justify="spacec-between"
    >
      <HeaderLink px={2} onClick={onClickHome}>
        <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
          mealoor
        </Heading>
      </HeaderLink>
      <Spacer />
      <Flex h="100%">
        <HeaderLink px={2} onClick={onClickSignin}>サインイン</HeaderLink>
        <HeaderLink px={2} onClick={onClickSignup}>サインアップ</HeaderLink>
      </Flex>
    </Flex>
  );
});
