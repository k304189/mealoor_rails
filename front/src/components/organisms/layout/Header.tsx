import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Flex, Heading, Spacer } from "@chakra-ui/react";

import { HeaderLink } from "../../atoms/layout/HeaderLink";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

export const Header: VFC = memo(() => {
  const history = useHistory();
  const { hasRequestHeader } = useRequestHeader();

  const onClickLogo = useCallback(() => {
    let nextUrl = "/";
    if (hasRequestHeader()) {
      nextUrl = "/dashboard";
    }
    history.push(nextUrl);
  }, []);

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
      <HeaderLink px={2} onClick={onClickLogo}>
        <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
          mealoor
        </Heading>
      </HeaderLink>
      <Spacer />
      { hasRequestHeader() ? (
        <Avatar bg="blue.700" />
      ) : (
        <Flex h="100%">
          <HeaderLink px={2} onClick={onClickSignin}>サインイン</HeaderLink>
          <HeaderLink px={2} onClick={onClickSignup}>サインアップ</HeaderLink>
        </Flex>
      ) }
    </Flex>
  );
});
