import { memo, useEffect, useState, VFC } from "react";
import { useParams } from "react-router-dom";
import { Box, Center, Flex } from "@chakra-ui/react";

import { UserEditForm } from "../../organisms/user/UserEditForm";
import { HeaderLayout } from "../../templates/HeaderLayout";

import { User } from "../../../types/api/user";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useLoginUser } from "../../../hooks/user/useLoginUser";
import { useMessage } from "../../../hooks/common/useMessage";

type UrlParams = {
  id: string;
}

export const UserDetail: VFC = memo(() => {
  const { id } = useParams<UrlParams>();
  const { showUser, isLogin } = useUserApi();
  const { loginUser } = useLoginUser();
  const { showMessage } = useMessage();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    isLogin()
      .then((result) => {
        if (result) {
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
        }
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title="ユーザー詳細">
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
        <Box
          as="article"
          h="100%"
          w="100%"
        >
          <Center>
            <Box w="50%">
              <Box className="sectionTitle">
                ユーザー情報
              </Box>
              <Box mt={5}>
                <UserEditForm user={user} isAdmin={loginUser?.admin} />
              </Box>
            </Box>
          </Center>
        </Box>
      </Flex>
    </HeaderLayout>
  );
});
