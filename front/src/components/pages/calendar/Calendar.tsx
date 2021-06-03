import { memo, VFC } from "react";
import { Box } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { CalendarTable } from "../../organisms/calendar/CalendarTable";

export const Calendar: VFC = memo(() => {
  return (
    <SigninHeaderLayout title="カレンダー">
      <Box as="article" w="100%" h="100%">
        <CalendarTable />
      </Box>
    </SigninHeaderLayout>
  );
});
