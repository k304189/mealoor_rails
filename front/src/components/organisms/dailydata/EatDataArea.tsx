import { memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";

import { EatTable } from "./EatTable";
import { EatButton } from "../../molecules/button/EatButton";
import { Eat } from "../../../types/api/eat";

type Props = {
  eatData: Array<Eat> | null;
  openEditModal: () => void;
};

export const EatDataArea: VFC<Props> = memo((props) => {
  const { eatData, openEditModal } = props;

  const [breakfast, setBreakfast] = useState<Array<Eat> | null>(null);
  const [lunch, setLunch] = useState<Array<Eat> | null>(null);
  const [dinner, setDinner] = useState<Array<Eat> | null>(null);
  const [snack, setSnack] = useState<Array<Eat> | null>(null);

  useEffect(() => {
    if (eatData) {
      const tmpBreakfast = eatData.filter((data) => data.eat_timing === "朝食");
      const tmpLunch = eatData.filter((data) => data.eat_timing === "昼食");
      const tmpDinner = eatData.filter((data) => data.eat_timing === "夕食");
      const tmpSnack = eatData.filter((data) => data.eat_timing === "間食");

      if (tmpBreakfast) {
        setBreakfast(tmpBreakfast);
      }
      if (tmpLunch) {
        setLunch(tmpLunch);
      }
      if (tmpDinner) {
        setDinner(tmpDinner);
      }
      if (tmpSnack) {
        setSnack(tmpSnack);
      }
    }
  }, [eatData]);

  return (
    <Box>
      <Flex>
        <Box className="sectionTitle">
          食事
        </Box>
        <EatButton onClick={openEditModal} />
      </Flex>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1}>
          <EatTable eatTiming="朝食" eatData={breakfast} />
        </GridItem>
        <GridItem colSpan={1}>
          <EatTable eatTiming="昼食" eatData={lunch} />
        </GridItem>
        <GridItem colSpan={1}>
          <EatTable eatTiming="夕食" eatData={dinner} />
        </GridItem>
        <GridItem colSpan={1}>
          <EatTable eatTiming="間食" eatData={snack} />
        </GridItem>
      </Grid>
    </Box>
  );
});
