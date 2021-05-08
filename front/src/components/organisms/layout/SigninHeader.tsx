import { Flex, Heading } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router-dom";

import { HeaderLink } from "../../atoms/layout/HeaderLink";

export const SigninHeader: VFC = memo(() => {
  const history = useHistory();

  const onClickDashboard = useCallback(() => history.push("/dashboard"), []);
  return (
    <Flex
      as="header"
      align="center"
      justify="spacec-between"
    >
      <HeaderLink px={2} onClick={onClickDashboard}>
        <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
          mealoor
        </Heading>
      </HeaderLink>
    </Flex>
  );
});
