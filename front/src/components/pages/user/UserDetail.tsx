import { memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Center, Flex } from "@chakra-ui/react";

import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { UserEditForm } from "../../organisms/user/UserEditForm";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

import { User } from "../../../types/api/user";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useLoginUser } from "../../../hooks/user/useLoginUser";
import { useMessage } from "../../../hooks/common/useMessage";

type UrlParams = {
  id: string;
}

export const UserDetail: VFC = memo(() => {
  const { id } = useParams<UrlParams>();
  const history = useHistory();
  const { showUser, isLogin } = useUserApi();
  const { loginUser } = useLoginUser();
  const { showMessage } = useMessage();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const onClickUserListButton = () => {
    history.push("/users");
  };

  useEffect(() => {
    setLoading(true);
    isLogin();
    showUser(id)
      .then((res) => {
        setUser(res);
      })
      .catch(() => {
        showMessage({ title: "指定ユーザーのデータ取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <SigninHeaderLayout loading={loading} title="ユーザー詳細">
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
        <Box
          as="article"
          h="100%"
          w="100%"
        >
          <Center>
            <Box w="50%">
              <SecondaryButton onClick={onClickUserListButton}>
                ユーザー一覧画面へ
              </SecondaryButton>
              <Box mt={5}>
                <UserEditForm user={user} isAdmin={loginUser?.admin} />
              </Box>
            </Box>
          </Center>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
