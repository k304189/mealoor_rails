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
import { useLoginUser } from "../../../hooks/user/useLoginUser";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const { hasRequestHeader } = useRequestHeader();
  const { loginUser } = useLoginUser();
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
              <MenuSection sectionClass="dataSection">
                ユーザーデータ
              </MenuSection>
              <MenuLink
                onClick={() => { history.push(`/users/detail/${loginUser?.id}`); }}
              >
                <Flex>
                  <AvatarButton size="sm" />
                  <Box ml={2}>
                    {loginUser?.nickname || "アカウント"}
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
              <MenuLink
                onClick={() => { history.push("/graph"); }}
              >
                食事グラフ
              </MenuLink>
              <MenuSection sectionClass="stockSection">
                自炊
              </MenuSection>
              <MenuLink
                onClick={() => { history.push("/stock"); }}
              >
                家にある食材
              </MenuLink>
              { loginUser?.admin ? (
                <>
                  <MenuSection sectionClass="adminSection">
                    管理者メニュー
                  </MenuSection>
                  <MenuLink
                    onClick={() => { history.push("/users"); }}
                  >
                    ユーザー一覧
                  </MenuLink>
                  <MenuLink
                    onClick={() => { history.push("/seasonalFood"); }}
                  >
                    旬の食材
                  </MenuLink>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <MenuSection sectionClass="aboutSection">
            mealoorについて
          </MenuSection>
          <MenuLink
            onClick={() => { history.push("/"); }}
          >
            トップ画面
          </MenuLink>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
});
