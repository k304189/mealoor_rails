import { memo, VFC } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from "@chakra-ui/react";

import { AvatarButton } from "../../atoms/button/AvatarButton";
import { MenuSection } from "../../atoms/layout/MenuSection";
import { MenuLink } from "../../atoms/layout/MenuLink";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const { hasRequestHeader } = useRequestHeader();
  const history = useHistory();

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader as="div" borderBottomWidth="1px">
          メニュー
        </DrawerHeader>
        <DrawerBody>
          { hasRequestHeader() ? (
            <>
              <MenuLink
                onClick={() => {}}
              >
                <Flex>
                  <AvatarButton size="sm" />
                  <Box ml={2}>
                    アカウント情報
                  </Box>
                </Flex>
              </MenuLink>
              <MenuLink
                onClick={() => { history.push("/calendar"); }}
              >
                カレンダー
              </MenuLink>
              <MenuLink
                onClick={() => { history.push("/dashboard"); }}
              >
                ダッシュボード
              </MenuLink>
              <MenuSection bg="red.300">
                食材
              </MenuSection>
              <MenuLink
                onClick={() => { history.push("/stock"); }}
              >
                家にある食材
              </MenuLink>
            </>
          ) : (
            <></>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
