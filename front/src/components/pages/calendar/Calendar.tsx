import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { useCalendar } from "../../../hooks/common/useCalendar";
import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";

export const Calendar: VFC = memo(() => {
  const { getCalendarArray } = useCalendar();
  console.log(getCalendarArray("2021-05"));

  return (
    <SigninHeaderLayout>
      <Box as="article" w="95%" h="95%">
        <h1>カレンダー画面です。</h1>
      </Box>
    </SigninHeaderLayout>
  );
});
