import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Box, Center, Flex, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { DefaultCheckbox } from "../../atoms/button/DefaultCheckbox";
import { InputNickname } from "../../organisms/input/user/InputNickname";
import { InputEmail } from "../../organisms/input/user/InputEmail";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

import { User } from "../../../types/api/user";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useUserValidate } from "../../../hooks/validate/useUserValidate";
import { useMessage } from "../../../hooks/common/useMessage";

type UrlParams = {
  id: string;
}

export const UserDetail: VFC = memo(() => {
  const { id } = useParams<UrlParams>();
  const history = useHistory();
  const { showUser, editUser } = useUserApi();
  const { showMessage } = useMessage();
  const { validateNickname } = useUserValidate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoding, setButtonLoding] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [userId, setUserId] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);

  const [nicknameInvalid, setNicknameInvalid] = useState(false);
  const [nicknameError, setNicknameError] = useState("");

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onBlurNickname = () => {
    const { invalid, errorMsg } = validateNickname(nickname);
    setNicknameInvalid(invalid);
    setNicknameError(errorMsg);
  };

  const onClickUserListButton = () => {
    history.push("/users");
  };

  const onClickAdminCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setAdmin(e.target.checked);
  };

  const getUpdateUserData = () => {
    return {
      nickname,
      admin,
    };
  };

  const setUserInfo = (u: User) => {
    setUser(u);
    setUserId(u.id);
    setNickname(u.nickname ?? "");
    setEmail(u.email);
    setAdmin(u.admin);
  };

  const onClickUpdate = () => {
    setButtonLoding(true);
    const updateData = getUpdateUserData();
    editUser(updateData)
      .then((res) => {
        showMessage({ title: "ユーザー更新に成功しました", status: "success" });
        setUserInfo(res);
      })
      .catch(() => {
        showMessage({ title: "ユーザー更新に失敗しました", status: "error" });
      })
      .finally(() => {
        setButtonLoding(false);
      });
  };

  useEffect(() => {
    setButtonDisabled(nicknameInvalid);
  }, [nicknameInvalid]);

  useEffect(() => {
    setLoading(true);
    showUser(id)
      .then((res) => {
        const getUser: User = res;
        if (getUser) {
          setUserInfo(getUser);
        }
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
              { user ? (
                <VStack mt={5} spacing={4}>
                  <InputNickname
                    nickname={nickname}
                    onChange={onChangeNickname}
                    invalid={nicknameInvalid}
                    error={nicknameError}
                    onBlur={onBlurNickname}
                  />
                  <InputEmail
                    email={email}
                    onChange={() => {}}
                    isReadOnly
                    onBlur={() => {}}
                  />
                  <Flex w="100%" justify="flex-start">
                    <DefaultCheckbox
                      size="lg"
                      isChecked={admin}
                      onChange={onClickAdminCheckbox}
                    >
                      管理者
                    </DefaultCheckbox>
                  </Flex>
                  <Flex w="100%" justify="flex-end">
                    <PrimaryButton
                      disabled={buttonDisabled}
                      loading={buttonLoding}
                      onClick={onClickUpdate}
                    >
                      更新
                    </PrimaryButton>
                  </Flex>
                </VStack>
              ) : (
                <Box>ユーザーが存在しません</Box>
              )}
            </Box>
          </Center>
        </Box>
      </Flex>
    </SigninHeaderLayout>
  );
});
