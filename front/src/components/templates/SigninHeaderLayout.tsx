import { memo, ReactNode, VFC } from "react";
import { Flex, Progress } from "@chakra-ui/react";

import { SigninHeader } from "../organisms/layout/SigninHeader";

type Props = {
  loading?: boolean;
  children: ReactNode;
};

export const SigninHeaderLayout: VFC<Props> = memo((props) => {
  const { loading = false, children } = props;
  return (
    <>
      <SigninHeader />
      { loading ? (
        <Flex align="center" justify="center" height="100vh">
          <Progress size="sm" w="50%" isIndeterminate />
        </Flex>
      ) : (
        children
      )}
    </>
  );
});
