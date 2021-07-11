import { memo, ReactNode, VFC } from "react";
import { Box, Flex, Progress } from "@chakra-ui/react";

import { Header } from "../organisms/layout/Header";

type Props = {
  loading?: boolean;
  title?: string | null;
  children: ReactNode;
};

export const HeaderLayout: VFC<Props> = memo((props) => {
  const { loading = false, title = null, children } = props;
  return (
    <>
      <Header />
      { loading ? (
        <Flex align="center" justify="center" height="100vh">
          <Progress size="sm" w="50%" isIndeterminate />
        </Flex>
      ) : (
        <Flex className="main">
          <Box w="95%" h="100%" overflow={{ base: "scroll", md: "auto" }}>
            { title ? (
              <>
                <Box className="title">
                  {title}
                </Box>
                <Box className="contents">
                  {children}
                </Box>
              </>
            ) : (
              <Box className="onlyContents">
                {children}
              </Box>
            )}
          </Box>
        </Flex>
      )}
    </>
  );
});
