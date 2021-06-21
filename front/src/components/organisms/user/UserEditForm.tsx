import { ChangeEvent, memo, useEffect, useState, VFC } from "react";
import { Box, Flex, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { DefaultCheckbox } from "../../atoms/button/DefaultCheckbox";
import { InputNickname } from "../input/user/InputNickname";
import { InputEmail } from "../input/user/InputEmail";
import { ChangePasswordForm } from "./ChangePasswordForm";

import { User } from "../../../types/api/user";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { useUserValidate } from "../../../hooks/validate/useUserValidate";
import { useMessage } from "../../../hooks/common/useMessage";

type Props = {
  user: User | null;
  isAdmin?: boolean;
};

export const UserEditForm: VFC<Props> = memo((props) => {
  const { user, isAdmin = false } = props;
  const { editUser } = useUserApi();
  const { showMessage } = useMessage();
  const { validateNickname } = useUserValidate();

  const [buttonLoding, setButtonLoding] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [userId, setUserId] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);

  const [nicknameInvalid, setNicknameInvalid] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [changePasswordIsOpen, setChangePasswordIsOpen] = useState(false);

  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onBlurNickname = () => {
    const { invalid, errorMsg } = validateNickname(nickname);
    setNicknameInvalid(invalid);
    setNicknameError(errorMsg);
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

  const setUserInfo = (u: User | null) => {
    setUserId(u?.id ?? 0);
    setNickname(u?.nickname ?? "");
    setEmail(u?.email ?? "");
    setAdmin(u?.admin ?? false);
  };

  const onClickUpdate = () => {
    setButtonLoding(true);
    const updateData = getUpdateUserData();
    editUser(userId, updateData)
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
    setUserInfo(user);
  }, []);

  return (
    <>
      { user ? (
        <>
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
            { isAdmin ? (
              <Flex w="100%" justify="flex-start">
                <DefaultCheckbox
                  size="lg"
                  isChecked={admin}
                  onChange={onClickAdminCheckbox}
                >
                  管理者
                </DefaultCheckbox>
              </Flex>
            ) : (
              <></>
            )}
            <Flex w="100%" justify="flex-start">
              <SecondaryButton
                onClick={() => { setChangePasswordIsOpen(true); }}
              >
                パスワード変更
              </SecondaryButton>
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
          <DefaultModal
            isOpen={changePasswordIsOpen}
            onClose={() => { setChangePasswordIsOpen(false); }}
            modalTitle="パスワード変更"
          >
            <ChangePasswordForm isAdmin={isAdmin} userId={userId} />
          </DefaultModal>
        </>
      ) : (
        <Box>指定のユーザーは存在していません</Box>
      )}
    </>
  );
});
