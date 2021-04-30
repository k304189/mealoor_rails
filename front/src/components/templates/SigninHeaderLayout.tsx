import { memo, ReactNode, VFC } from "react";

import { SigninHeader } from "../organisms/layout/SigninHeader";

type Props = {
  children: ReactNode;
};

export const SigninHeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <SigninHeader />
      {children}
    </>
  );
});
