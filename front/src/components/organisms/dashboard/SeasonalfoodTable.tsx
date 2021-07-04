import { memo, VFC } from "react";
import { Box, Table, Tr, Td, Thead, Tbody } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faAppleAlt, faFish } from "@fortawesome/free-solid-svg-icons";

import { Dashboard } from "../../../types/api/dashboard";
import { SeasonalFood } from "../../../types/api/seasonalFood";

type Props = {
  dashboard: Dashboard | null;
};

export const SeasonalfoodTable: VFC<Props> = memo((props) => {
  const { dashboard } = props;
  let vegetable: SeasonalFood | null = null;
  let fruit: SeasonalFood | null = null;
  let seafood: SeasonalFood | null = null;

  if (dashboard) {
    vegetable = dashboard.seasonalfood.vegetable ? dashboard.seasonalfood.vegetable : null;
    fruit = dashboard.seasonalfood.fruit ? dashboard.seasonalfood.fruit : null;
    seafood = dashboard.seasonalfood.seafood ? dashboard.seasonalfood.seafood : null;
  }

  return (
    <Box w="100%" h="100%">
      { dashboard ? (
        <Table w="100%" h="100%" variant="unstyled" fontSize="2xl" color="#FFFFFF">
          <Thead>
            <Tr h="10%">
              <Td w="33%" px={0} textAlign="center" bg="#99CC66">野菜</Td>
              <Td w="33%" px={0} textAlign="center" bg="#006888">魚介類</Td>
              <Td w="33%" px={0} textAlign="center" bg="#FF3366">フルーツ</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr h="90%">
              <Td p={0} textAlign="center" bg="#99CC66">
                <FontAwesomeIcon icon={faLeaf} size="4x" />
                {vegetable ? (
                  <>
                    <Box mt={6}>{vegetable.name}</Box>
                    <Box fontSize="md">
                      { vegetable.start_month === vegetable.end_month
                        ? `${vegetable.start_month}月`
                        : `${vegetable.start_month}月～${vegetable.end_month}月` }
                    </Box>
                  </>
                ) : (
                  <Box>旬の野菜はありません</Box>
                )}
              </Td>
              <Td p={0} textAlign="center" bg="#006888">
                <FontAwesomeIcon icon={faFish} size="4x" />
                {seafood ? (
                  <>
                    <Box mt={6}>{seafood.name}</Box>
                    <Box fontSize="md">
                      { seafood.start_month === seafood.end_month
                        ? `${seafood.start_month}月`
                        : `${seafood.start_month}月～${seafood.end_month}月` }
                    </Box>
                  </>
                ) : (
                  <Box>旬の魚介類はありません</Box>
                )}
              </Td>
              <Td p={0} textAlign="center" bg="#FF3366">
                <FontAwesomeIcon icon={faAppleAlt} size="4x" />
                {fruit ? (
                  <>
                    <Box mt={6}>{fruit.name}</Box>
                    <Box fontSize="md">
                      { fruit.start_month === fruit.end_month
                        ? `${fruit.start_month}月`
                        : `${fruit.start_month}月～${fruit.end_month}月` }
                    </Box>
                  </>
                ) : (
                  <Box>旬のフルーツはありません</Box>
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      ) : (
        <Box>旬の食材データが存在しません</Box>
      )}
    </Box>
  );
});
