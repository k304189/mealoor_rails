import { memo, VFC } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import { EatTable } from "./EatTable";
import { EatButton } from "../../molecules/button/EatButton";
import { Eat } from "../../../types/api/eat";

type Props = {
  eatData: Array<Eat> | null;
  openEditModal: () => void;
  onClickEatNameLink: (id: number) => void;
};

export const EatDataArea: VFC<Props> = memo((props) => {
  const { eatData, openEditModal, onClickEatNameLink } = props;

  return (
    <Box>
      <Flex>
        <Box className="sectionTitle">
          食事
        </Box>
        <EatButton onClick={() => { openEditModal(); }} />
      </Flex>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1}>
          <EatTable
            eatTiming="朝食"
            onClickEatNameLink={onClickEatNameLink}
            eatData={eatData}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <EatTable
            eatTiming="昼食"
            onClickEatNameLink={onClickEatNameLink}
            eatData={eatData}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <EatTable
            eatTiming="夕食"
            onClickEatNameLink={onClickEatNameLink}
            eatData={eatData}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <EatTable
            eatTiming="間食"
            onClickEatNameLink={onClickEatNameLink}
            eatData={eatData}
          />
        </GridItem>
      </Grid>
    </Box>
  );
});
