import { memo, useEffect, useState, VFC } from "react";
import { Box, Flex, Spinner, Table, Tbody, Thead, Tr, Td } from "@chakra-ui/react";

import { DefaultPaging } from "../../atoms/button/DefaultPaging";
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
  const [historyPagingOffset, setHistoryPagingOffset] = useState(0);
  const [foodstuffPagingOffset, setFoodstuffPagingOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const historyPagingDisplayNum = 5;
  const onChangeHistoryPage = (page: {selected: number}) =>
    setHistoryPagingOffset(historyPagingDisplayNum * page.selected);

  const foodstuffPagingDisplayNum = 5;
  const onChangeFoodstuffPage = (page: {selected: number}) =>
    setFoodstuffPagingOffset(foodstuffPagingDisplayNum * page.selected);

  useEffect(() => {
    if (stock) {
      getHistoryUsage(stock.id)
        .catch(() => {
          showMessage({ title: "使用履歴の取得が失敗しました", status: "error" });
        })
        .finally(() => {
          if (stock.stock_type === "料理") {
            getFoodstuffUsage(stock.id)
              .catch(() => {
                showMessage({ title: "使用食材の取得が失敗しました", status: "error" });
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            setLoading(false);
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <Box h="100%" ml={2}>
      {loading ? (
        <Flex h="100%" justify="center" align="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Box>
          <Box>
            <Box className="sectionTitle">
              使用履歴
            </Box>
            {historyUsages.length > 0 ? (
              <>
                <Flex justify="end">
                  <DefaultPaging
                    displayNum={historyPagingDisplayNum}
                    dataNum={historyUsages.length}
                    onPageChange={onChangeHistoryPage}
                  />
                </Flex>
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
                    {historyUsages
                      .slice(historyPagingOffset, historyPagingOffset + historyPagingDisplayNum)
                      .map((data) => (
                        <Tr key={data.id}>
                          <Td w="10%">{data.use_date}</Td>
                          <Td w="20%">{data.use_type}</Td>
                          <Td w="15%">{data.use_rate}%</Td>
                          <Td w="55%">{data.note}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </>
            ) : (
              <Box>使用履歴はありません</Box>
            )}
          </Box>
          <Box mt={10}>
            {foodstuffUsages.length > 0 ? (
              <>
                <Box className="sectionTitle">
                  材料
                </Box>
                <Flex justify="end">
                  <DefaultPaging
                    displayNum={foodstuffPagingDisplayNum}
                    dataNum={foodstuffUsages.length}
                    onPageChange={onChangeFoodstuffPage}
                  />
                </Flex>
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
                    {foodstuffUsages
                      .slice(
                        foodstuffPagingOffset,
                        foodstuffPagingOffset + foodstuffPagingDisplayNum,
                      )
                      .map((data) => (
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
      )}
    </Box>
  );
});
