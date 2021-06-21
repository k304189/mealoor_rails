import { ChangeEvent, memo, useState, VFC } from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { InputPassword } from "../input/user/InputPassword";

import { useUserApi } from "../../../hooks/user/useUserApi";
import { useMessage } from "../../../hooks/common/useMessage";

type Props = {
  isAdmin?: boolean;
  userId?: number;
};

export const ChangePasswordForm: VFC<Props> = memo((props) => {
  const { isAdmin = false, userId = 0 } = props;
  const { editUser } = useUserApi();
  const { showMessage } = useMessage();

  const [beforePassword, setBeforePassword] = useState("");
  const [afterPassword, setAfterPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [buttonLoding, setButtonLoding] = useState(false);

  const onChangeBeforePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setBeforePassword(e.target.value);

  const onChangeAfterPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setAfterPassword(e.target.value);

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  const getUpdatePassword = () => {
    return {
      password: afterPassword,
      password_confirmation: passwordConfirmation,
    };
  };

  const onClickChangePassword = () => {
    if (afterPassword !== passwordConfirmation) {
      showMessage({
        title: "新しいパスワードと確認用が一致しません。再確認してください",
        status: "error",
      });
      return;
    }
    setButtonLoding(true);
    const passwordData = getUpdatePassword();
    editUser(userId, passwordData)
      .then(() => {
        showMessage({ title: "パスワードを変更しました", status: "success" });
      })
      .catch(() => {
        showMessage({ title: "パスワード変更が失敗しました", status: "error" });
      })
      .finally(() => {
        setButtonLoding(false);
      });
  };

  return (
    <VStack spacing={4}>
      { isAdmin ? (
        <></>
      ) : (
        <InputPassword
          label="現在のパスワード"
          password={beforePassword}
          onChange={onChangeBeforePassword}
        />
      )}
      <InputPassword
        label="新しいのパスワード"
        password={afterPassword}
        onChange={onChangeAfterPassword}
      />
      <InputPassword
        label="新しいのパスワード(確認用)"
        password={passwordConfirmation}
        onChange={onChangePasswordConfirmation}
      />
      <Flex w="100%" justify="flex-end">
        <PrimaryButton
          loading={buttonLoding}
          onClick={onClickChangePassword}
        >
          変更
        </PrimaryButton>
      </Flex>
    </VStack>
  );
});
