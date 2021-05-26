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
      }
    }
  }, []);

  return (
    <Box h="100%">
      <Box className="sectionTitle">
        使用履歴
      </Box>
      {historyUsages.length > 0 ? (
        <Table size="sm">
          <Thead>
            <Tr>
              <Td>使用日</Td>
              <Td>使用タイプ</Td>
              <Td>使用率</Td>
              <Td>一言メモ</Td>
            </Tr>
          </Thead>
          <Tbody>
            {historyUsages.map((data) => (
              <Tr>
                <Td>{data.use_date}</Td>
                <Td>{data.use_type}</Td>
                <Td>{data.use_rate}%</Td>
                <Td>{data.note}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Box>使用履歴はありません</Box>
      )}
    </Box>
  );
});
