import { memo, ReactNode, VFC } from "react";
import { SignoutHeader } from "../organisms/layout/SignoutHeader";

type Props = {
  children: ReactNode;
};

export const SignoutHeaderLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <SignoutHeader />
      {children}
    </>
  );
});
