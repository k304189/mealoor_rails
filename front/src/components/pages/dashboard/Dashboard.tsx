import { memo, VFC, useEffect } from "react";

import { useIsLogin } from "../../../hooks/user/useIsLogin";

export const Dashboard: VFC = memo(() => {

  const { isLogin } = useIsLogin();
  useEffect(() => {
    isLogin();
  }, []);

  return (
    <div>
      <h1>ログイン後のダッシュボード画面です</h1>
    </div>
  );
});
