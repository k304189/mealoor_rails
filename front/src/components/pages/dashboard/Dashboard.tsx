import { memo, VFC, useEffect } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";

import { EatSummaryBox } from "../../organisms/dashboard/EatSummaryBox";
import { useUserApi } from "../../../hooks/user/useUserApi";
import { HeaderLayout } from "../../templates/HeaderLayout";

export const Dashboard: VFC = memo(() => {
  const { isLogin } = useUserApi();

  useEffect(() => {
    isLogin();
    // isLogin()
    //   .then((res) => {
    //     console.log("isLogin Called!");
    //     console.log(res);
    //   });
  }, []);

  return (
    <HeaderLayout title="ダッシュボード">
      <Box as="article" w="100%" h="100%">
        <h1>ログイン後のダッシュボード画面です</h1>
        <SimpleGrid columns={4} spacing={1}>
          <EatSummaryBox
            bg="#00C0EF"
            headerLabel="朝食"
            todayKcal={1200}
            todayPrice={500}
            yesterdayKcal={681}
            yesterdayPrice={1500}
          />
          <EatSummaryBox
            bg="#F39C12"
            headerLabel="昼食"
            todayKcal={1200}
            todayPrice={500}
            yesterdayKcal={681}
            yesterdayPrice={1500}
          />
          <EatSummaryBox
            bg="#F56954"
            headerLabel="夕食"
            todayKcal={1200}
            todayPrice={500}
            yesterdayKcal={681}
            yesterdayPrice={1500}
          />
          <EatSummaryBox
            bg="#00A65A"
            headerLabel="間食"
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
