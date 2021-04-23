/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Center, Flex, Heading, Link, Spacer, useDisclosure } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";

import { HeaderLink } from "../../atoms/layout/HeaderLink"

export const SignoutHeader: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickSignin = useCallback(
    () => history.push("/signin"),
    []
  );
  const onClickSignup = useCallback(() => history.push("/signup"), []);
  return (
    <Flex
      as="nav"
      bg="teal.500"
      color="gray.50"
      align="center"
      justify="spacec-between"
      h={{ base: "28px", md: "48px"}}
    >
      <HeaderLink px={2} onClick={onClickHome} opacity="1">
        <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
          mealoor
        </Heading>
      </HeaderLink>
      <Spacer />
      <HeaderLink px={2} onClick={onClickSignin}>サインイン</HeaderLink>
      <HeaderLink px={2} onClick={onClickSignup}>サインアップ</HeaderLink>
    </Flex>
  );
});
