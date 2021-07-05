import { memo, VFC, useEffect, useState } from "react";
import { Box, Grid, GridItem, SimpleGrid } from "@chakra-ui/react";

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

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [loading, setLoading] = useState(false);

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
        <Box className="sectionTitle">今日のデータ</Box>
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
              <Box className="sectionTitle">賞味期限が近い食材</Box>
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
