import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Center, Flex, Table, Tr, Td, Tbody, Thead } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultCheckbox } from "../../atoms/button/DefaultCheckbox";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

import { User } from "../../../types/api/user";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useMessage } from "../../../hooks/common/useMessage";

type UrlParams = {
  id: string;
}

export const UserDetail: VFC = memo(() => {
  const { id } = useParams<UrlParams>();
  const history = useHistory();
  const { showUser } = useUserApi();
  const { showMessage } = useMessage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);

  const onClickUserListButton = () => {
    history.push("/users");
  };

  const onClickAdminCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmin(e.target.checked);
  };

  useEffect(() => {
    setLoading(true);
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
              <PrimaryButton onClick={onClickUserListButton}>
                ユーザー一覧画面へ
              </PrimaryButton>
              { user ? (
                <Table>
                  <Thead>
                    <Tr>
                      <Td>個人情報</Td>
                      <Td />
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>ニックネーム</Td>
                      <Td>{user.nickname}</Td>
                    </Tr>
                    <Tr>
                      <Td>メールアドレス</Td>
                      <Td>{user.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>管理者</Td>
                      <Td>
                        <DefaultCheckbox
                          size="lg"
                          isChecked={admin}
                          onChange={onClickAdminCheckbox}
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>パスワード</Td>
                      <Td />
                    </Tr>
                    <Tr>
                      <Td>メールアドレス変更</Td>
                      <Td />
                    </Tr>
                  </Tbody>
                </Table>
              ) : (
                <Box>ユーザーが存在しません</Box>
              ) }
            </Box>
          </Center>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
