import { useEffect, memo, VFC } from "react";
import { Box, Table, Tbody, Thead, Tr, Td } from "@chakra-ui/react";

import { Stock } from "../../../types/api/stock";
import { useUsageApi } from "../../../hooks/usage/useUsageApi";
import { useMessage } from "../../../hooks/common/useMessage";

type Props = {
  stock? : Stock | null;
};

export const UsageListTable: VFC<Props> = memo((props) => {
  const {
    historyUsages,
    foodstuffUsages,
    getHistoryUsage,
    getFoodstuffUsage,
  } = useUsageApi();

  const { showMessage } = useMessage();
  const { stock = null } = props;

  useEffect(() => {
    if (stock) {
      getHistoryUsage(stock.id)
        .catch(() => {
          showMessage({ title: "使用履歴の取得が失敗しました", status: "error" });
        });
      if (stock.stock_type === "料理") {
        getFoodstuffUsage(stock.id)
          .catch(() => {
            showMessage({ title: "使用食材の取得が失敗しました", status: "error" });
          });
        console.log(foodstuffUsages);
      }
    }
  }, []);

  return (
    <Box>
      <Box>
        <Box className="sectionTitle">
          使用履歴
        </Box>
        {historyUsages.length > 0 ? (
          <Table size="sm">
            <Thead>
              <Tr>
                <Td w="10%">使用日</Td>
                <Td w="20%">使用タイプ</Td>
                <Td w="15%">使用率</Td>
                <Td w="55%">一言メモ</Td>
              </Tr>
            </Thead>
            <Tbody>
              {historyUsages.map((data) => (
                <Tr key={data.id}>
                  <Td w="10%">{data.use_date}</Td>
                  <Td w="20%">{data.use_type}</Td>
                  <Td w="15%">{data.use_rate}%</Td>
                  <Td w="55%">{data.note}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Box>使用履歴はありません</Box>
        )}
      </Box>
      <Box>
        {foodstuffUsages.length > 0 ? (
          <>
            <Box className="sectionTitle">
              材料
            </Box>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Td w="40%">食材名</Td>
                  <Td w="20%">カテゴリー</Td>
                  <Td w="15%">価格</Td>
                  <Td w="20%">カロリー</Td>
                  <Td w="5%">量</Td>
                </Tr>
              </Thead>
              <Tbody>
                {foodstuffUsages.map((data) => (
                  <Tr key={data.id}>
                    <Td w="40%">{data.name}</Td>
                    <Td w="20%">{data.category}</Td>
                    <Td w="15%">{data.price}円</Td>
                    <Td w="20%">{data.kcal}kcal</Td>
                    <Td w="5%">{data.amount}{data.unit}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
});
