import { memo, useState, VFC } from "react";
import { Box, Center, Flex, Table, Tr, Td, Tbody, Thead, Spacer } from "@chakra-ui/react";

import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const UserList: VFC = memo(() => {
  const users = [
    { id: 1, nickname: "テスト１", email: "test1@test.com" },
    { id: 2, nickname: "テスト２", email: "test2@test.com" },
    { id: 3, nickname: "テスト３", email: "test3@test.com" },
    { id: 4, nickname: "テスト１", email: "test1@test.com" },
    { id: 5, nickname: "テスト２", email: "test2@test.com" },
    { id: 6, nickname: "テスト３", email: "test3@test.com" },
    { id: 7, nickname: "テスト１", email: "test1@test.com" },
    { id: 8, nickname: "テスト２", email: "test2@test.com" },
    { id: 9, nickname: "テスト３", email: "test3@test.com" },
    { id: 10, nickname: "テスト１", email: "test1@test.com" },
    { id: 11, nickname: "テスト２", email: "test2@test.com" },
    { id: 12, nickname: "テスト３", email: "test3@test.com" },
    { id: 13, nickname: "テスト１", email: "test1@test.com" },
    { id: 14, nickname: "テスト２", email: "test2@test.com" },
    { id: 15, nickname: "テスト３", email: "test3@test.com" },
    { id: 16, nickname: "テスト１", email: "test1@test.com" },
    { id: 17, nickname: "テスト２", email: "test2@test.com" },
    { id: 18, nickname: "テスト３", email: "test3@test.com" },
  ];

  const [pagingOffset, setpagingOffset] = useState(0);

  const displayNum = 10;
  const onChangePage = (page: {selected: number}) =>
    setpagingOffset(displayNum * page.selected);

  return (
    <SigninHeaderLayout loading={false} title="ユーザー一覧">
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
                        <Td>{user.nickname}</Td>
                        <Td>{user.email}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </Center>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
