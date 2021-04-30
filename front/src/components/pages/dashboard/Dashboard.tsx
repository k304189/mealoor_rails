import { memo, VFC, useEffect } from "react";

import { useIsLogin } from "../../../hooks/user/useIsLogin";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const Dashboard: VFC = memo(() => {
  const { isLogin } = useIsLogin();
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <SigninHeaderLayout>
      <div>
        <h1>ログイン後のダッシュボード画面です</h1>
      </div>
    </SigninHeaderLayout>
  );
});
