import { memo, ReactNode, VFC } from "react";
import { Box, Flex, Progress } from "@chakra-ui/react";

import { SigninHeader } from "../organisms/layout/SigninHeader";

type Props = {
  loading?: boolean;
  title?: string | null;
  children: ReactNode;
};

export const SigninHeaderLayout: VFC<Props> = memo((props) => {
  const { loading = false, title = null, children } = props;
  return (
    <>
      <SigninHeader />
      { loading ? (
        <Flex align="center" justify="center" height="100vh">
          <Progress size="sm" w="50%" isIndeterminate />
        </Flex>
      ) : (
        <Flex className="main">
          <Box w="95%" h="100%" overflow={{ base: "scroll", md: "auto" }}>
            { title ? (
              <Box className="title">
                {title}
              </Box>
            ) : (
              <div />
            )}
            <Box className="contents">
              {children}
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
});
