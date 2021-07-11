import { memo, VFC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { HeaderLayout } from "../../templates/HeaderLayout";
import { useRequestHeader } from "../../../hooks/user/useRequestHeader";
import { useMessage } from "../../../hooks/common/useMessage";

export const Withdraw: VFC = memo(() => {
  const { hasRequestHeader } = useRequestHeader();
  const { showMessage } = useMessage();
  const history = useHistory();

  useEffect(() => {
    if (hasRequestHeader()) {
      showMessage({ title: "この画面は参照できません", status: "error" });
      history.push("/dashboard");
    }
  }, []);

  return (
    <HeaderLayout>
      <Box className="withdraw" as="article" h="100%" w="100%">
        <div>
          <h1>退会処理が完了致しました。</h1>
          <p>今までご利用ありがとうございました。</p>
          <p>またの機会のご利用おまちしております。</p>
        </div>
      </Box>
    </HeaderLayout>
  );
});
