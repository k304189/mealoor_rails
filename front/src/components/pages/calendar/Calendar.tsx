import { memo, VFC, useState } from "react";
import { Box } from "@chakra-ui/react";

import { SigninHeaderLayout } from "../../templates/SigninHeaderLayout";
import { DefaultModal } from "../../molecules/layout/DefaultModal";
import { CalendarTable } from "../../organisms/calendar/CalendarTable";
import { EatEditForm } from "../../organisms/eat/EatEditForm";

export const Calendar: VFC = memo(() => {
  const [eatEditFormIsOpen, setEatEditFormIsOpen] = useState(false);

  return (
    <SigninHeaderLayout title="カレンダー">
      <Box as="article" w="100%" h="100%">
        <CalendarTable
          openEditModal={() => { setEatEditFormIsOpen(true); }}
        />
      </Box>
      <DefaultModal
        isOpen={eatEditFormIsOpen}
        onClose={() => { setEatEditFormIsOpen(false); }}
        modalTitle="食事登録"
        size="3xl"
      >
        <EatEditForm />
      </DefaultModal>
    </SigninHeaderLayout>
  );
});
