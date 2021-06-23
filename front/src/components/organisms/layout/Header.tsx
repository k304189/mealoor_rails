import { memo, useCallback, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Spacer,
} from "@chakra-ui/react";

import { AvatarButton } from "../../atoms/button/AvatarButton";
import { DefaultDialog } from "../../molecules/layout/DefaultDialog";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { HeaderLink } from "../../atoms/layout/HeaderLink";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

export const Header: VFC = memo(() => {
  const history = useHistory();
  const { signout } = useUserApi();
  const { hasRequestHeader } = useRequestHeader();

  const [confirmSignout, setConfirmSignout] = useState(false);

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
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Box m={5}>
              <AvatarButton
                size="sm"
              />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <SecondaryButton size="sm" onClick={() => { setConfirmSignout(true); }}>
                ログアウト
              </SecondaryButton>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Flex h="100%">
          <HeaderLink px={2} onClick={onClickSignin}>サインイン</HeaderLink>
          <HeaderLink px={2} onClick={onClickSignup}>サインアップ</HeaderLink>
        </Flex>
      ) }
      <DefaultDialog
        isOpen={confirmSignout}
        onClose={() => { setConfirmSignout(false); }}
        onClick={signout}
      >
        ログアウトしてもよろしいでしょうか。
      </DefaultDialog>
    </Flex>
  );
});
