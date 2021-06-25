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
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { AvatarButton } from "../../atoms/button/AvatarButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { HeaderLink } from "../../atoms/layout/HeaderLink";
import { MenuDrawer } from "../../molecules/layout/MenuDrawer";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { DefaultDialog } from "../../molecules/layout/DefaultDialog";
import { SigninForm } from "../user/SigninForm";
import { SignupForm } from "../user/SignupForm";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";
import { useLoginUser } from "../../../hooks/user/useLoginUser";

export const Header: VFC = memo(() => {
  const history = useHistory();
  const { signout } = useUserApi();
  const { hasRequestHeader } = useRequestHeader();
  const { loginUser } = useLoginUser();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [signinModalIsOpen, setSigninModalIsOpen] = useState(false);
  const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
  const [confirmSignout, setConfirmSignout] = useState(false);

  const onClickLogo = useCallback(() => {
    let nextUrl = "/";
    if (hasRequestHeader()) {
      nextUrl = "/dashboard";
    }
    history.push(nextUrl);
  }, []);

  return (
    <Flex
      as="header"
      align="center"
      justify="spacec-between"
    >
      <Flex h="100%">
        <HeaderLink px={2} onClick={() => { setMenuIsOpen(true); }} tooltipText="メニュー表示">
          <HamburgerIcon />
        </HeaderLink>
        <HeaderLink px={2} onClick={onClickLogo}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            mealoor
          </Heading>
        </HeaderLink>
      </Flex>
      <Spacer />
      { hasRequestHeader() ? (
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Box m={5}>
              <AvatarButton size="sm" />
            </Box>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack>
                <Box>
                  <AvatarButton size="md" />
                </Box>
                <Box as="div">{loginUser?.nickname}</Box>
                <SecondaryButton size="sm" onClick={() => { setConfirmSignout(true); }}>
                  ログアウト
                </SecondaryButton>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Flex h="100%">
          <HeaderLink px={2} onClick={() => { setSigninModalIsOpen(true); }}>サインイン</HeaderLink>
          <HeaderLink px={2} onClick={() => { setSignupModalIsOpen(true); }}>サインアップ</HeaderLink>
          <DefaultModal
            isOpen={signinModalIsOpen}
            onClose={() => { setSigninModalIsOpen(false); }}
            modalTitle="サインイン"
          >
            <SigninForm />
          </DefaultModal>
          <DefaultModal
            isOpen={signupModalIsOpen}
            onClose={() => { setSignupModalIsOpen(false); }}
            modalTitle="サインアップ"
          >
            <SignupForm />
          </DefaultModal>
        </Flex>
      ) }
      <MenuDrawer isOpen={menuIsOpen} onClose={() => { setMenuIsOpen(false); }} />
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
