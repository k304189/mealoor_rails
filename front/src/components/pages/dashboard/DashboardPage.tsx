import { memo, VFC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex, Grid, GridItem, HStack, SimpleGrid } from "@chakra-ui/react";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DashboardEatCard } from "../../organisms/dashboard/DashboardEatCard";
import { DashboardHealthCard } from "../../organisms/dashboard/DashboardHealthCard";
import { LimitSoonStockTable } from "../../organisms/dashboard/LimitSoonStockTable";
import { SeasonalfoodTable } from "../../organisms/dashboard/SeasonalfoodTable";
import { useMessage } from "../../../hooks/common/useMessage";
import { useDashboardApi } from "../../../hooks/dashboard/useDashboardApi";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { Dashboard } from "../../../types/api/dashboard";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const DashboardPage: VFC = memo(() => {
  const { isLogin } = useUserApi();
  const { showMessage } = useMessage();
  const { getDashborad } = useDashboardApi();
  const history = useHistory();

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(false);

  const todayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = `00${today.getMonth() + 1}`.slice(-2);
    const date = `00${today.getDate()}`.slice(-2);
    return `${year}-${month}-${date}`;
  };

  useEffect(() => {
    isLogin()
      .then(() => {
        setLoading(true);
        getDashborad()
          .then((res) => {
            setDashboard(res);
          })
          .catch(() => {
            showMessage({ title: "ダッシュボードのデータ取得に失敗しました", status: "error" });
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, []);

  return (
    <HeaderLayout title="ダッシュボード" loading={loading}>
      <Box as="article" w="100%" h="100%">
        <Flex>
          <Box className="sectionTitle" mr={10}>
            今日のサマリー
          </Box>
          <HStack spacing={5}>
            <DefaultLink
              tooltipText="カレンダー画面へ"
              onClick={() => { history.push("/calendar"); }}
            >
              カレンダー
            </DefaultLink>
            <DefaultLink
              tooltipText="本日のデイリーデータ画面へ"
              onClick={() => { history.push(`/dailydata/${todayString()}`); }}
            >
              デイリーデータ
            </DefaultLink>
          </HStack>
        </Flex>
        <SimpleGrid columns={4} spacing={1}>
          <DashboardHealthCard dashboard={dashboard} />
          <DashboardEatCard dashboard={dashboard} />
        </SimpleGrid>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={5}
          mt={5}
        >
          <GridItem colSpan={2}>
            <Box>
              <Flex>
                <Box className="sectionTitle" mr={10}>賞味期限が近い食材</Box>
                <DefaultLink
                  tooltipText="家にある食材画面へ"
                  onClick={() => { history.push("/stock"); }}
                >
                  家にある食材
                </DefaultLink>
              </Flex>
              <LimitSoonStockTable dashboard={dashboard} />
            </Box>
          </GridItem>
          <GridItem colSpan={1}>
            <Box>
              <Box className="sectionTitle">今月の旬の食材</Box>
              <SeasonalfoodTable dashboard={dashboard} />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </HeaderLayout>
  );
});
