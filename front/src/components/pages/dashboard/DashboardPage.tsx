import { memo, VFC, useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import { EatSummaryCard } from "../../molecules/layout/EatSummaryCard";
import { HealthCard } from "../../molecules/layout/HealthCard";
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

  useEffect(() => {
    isLogin()
      .then(() => {
        getDashborad()
          .then((res) => {
            setDashboard(res);
          })
          .catch(() => {
            showMessage({ title: "ダッシュボードのデータ取得に失敗しました", status: "error" });
          });
      });
  }, []);

  return (
    <HeaderLayout title="ダッシュボード">
      <Box as="article" w="100%" h="100%">
        <h1>ログイン後のダッシュボード画面です</h1>
        <SimpleGrid columns={4} spacing={1}>
          <HealthCard
            todayWeight={81}
            todayFatPercent={25.6}
            todayFatWeight={20.73}
            yesterdayWeight={82.5}
            yesterdayFatPercent={25.6}
            yesterdayFatWeight={21.12}
          />
          <EatSummaryCard
            todayKcal={1200}
            todayPrice={500}
            yesterdayKcal={681}
            yesterdayPrice={1500}
          />
        </SimpleGrid>
      </Box>
    </HeaderLayout>
  );
});
