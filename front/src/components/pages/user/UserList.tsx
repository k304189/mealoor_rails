import { memo, useEffect, useState, VFC } from "react";
import { useHistory } from "react-router-dom";
import { Box, Center, Flex, Table, Tr, Td, Tbody, Thead, Spacer } from "@chakra-ui/react";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { HeaderLayout } from "../../templates/HeaderLayout";

import { useUserApi } from "../../../hooks/user/useUserApi";
import { useMessage } from "../../../hooks/common/useMessage";

export const UserList: VFC = memo(() => {
  const { users, getUsers } = useUserApi();
  const { showMessage } = useMessage();
  const history = useHistory();

  const [pagingOffset, setpagingOffset] = useState(0);

  const [loading, setLoading] = useState(false);

  const displayNum = 10;
  const onChangePage = (page: {selected: number}) =>
    setpagingOffset(displayNum * page.selected);

  const onClickLink = (id: number) => {
    history.push(`/users/detail/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    getUsers()
      .catch(() => {
        showMessage({ title: "ユーザーのデータが取得できませんでした", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title="ユーザー一覧">
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
        <Box
          as="article"
          h="100%"
          w="100%"
        >
          <Center>
            <Box w="50%">
              <Flex>
                <Box className="sectionTitle">
                  ユーザー一覧
                </Box>
                <Spacer />
                <DefaultPaging
                  displayNum={displayNum}
                  dataNum={users ? users.length : 0}
                  onPageChange={onChangePage}
                />
              </Flex>
              { users ? (
                <Table>
                  <Thead>
                    <Tr>
                      <Td>ニックネーム</Td>
                      <Td>メールアドレス</Td>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { users
                      .slice(pagingOffset, pagingOffset + displayNum)
                      .map((user) => (
                        <Tr key={user.id}>
                          <Td>
                            <DefaultLink onClick={() => { onClickLink(user.id); }}>
                              {user.nickname}
                            </DefaultLink>
                          </Td>
                          <Td>
                            <DefaultLink onClick={() => { onClickLink(user.id); }}>
                              {user.email}
                            </DefaultLink>
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              ) : (
                <Box>ユーザーが存在しません</Box>
              ) }
            </Box>
          </Center>
        </Box>
      </Flex>
    </HeaderLayout>
  );
});
