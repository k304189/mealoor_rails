import { ChangeEvent, memo, VFC } from "react";
import { Checkbox, Flex, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { AddButton } from "../../molecules/button/AddButton";
import { MinusButton } from "../../molecules/button/MinusButton";
import { StockUsage } from "../../../types/pages/stock/stockUsage";

type Props = {
  stockUsageList: Array<StockUsage>;
  checkedList: Array<number>;
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onChangeUsedRate: (value: number, id: number) => void;
};

export const StockUsageTable: VFC<Props> = memo((props) => {
  const {
    stockUsageList,
    checkedList,
    onChangeCheckbox,
    onChangeUsedRate,
  } = props;

  const onClickAddRateButton = (id: number, isMinus = false) => {
    const index = stockUsageList.findIndex((data) => data.id === id);
    if (index > -1) {
      const { remain, per_rate } = stockUsageList[index];
      let usedRate = stockUsageList[index].used_rate;
      if (isMinus) {
        usedRate = ((usedRate - per_rate * 2) > 0) ? usedRate - per_rate : 0;
      } else {
        usedRate = ((usedRate + per_rate * 2) > remain) ? remain : usedRate + per_rate;
      }
      onChangeUsedRate(usedRate, id);
    }
  };

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Td w={{ base: "15%", md: "10%" }}>選択</Td>
          <Td w={{ base: "25%", md: "25%" }}>食材名</Td>
          <Td w={{ base: "15%", md: "10%" }}>残量</Td>
          <Td w={{ base: "15%", md: "10%" }}>個数</Td>
          <Td
            display={{ base: "none", md: "table-cell" }}
            w={{ base: "0%", md: "15%" }}
          >
            ％／1コ
          </Td>
          <Td w={{ base: "30%", md: "20%" }}>使用量</Td>
          <Td
            display={{ base: "none", md: "table-cell" }}
            w={{ base: "0%", md: "10%" }}
          />
        </Tr>
      </Thead>
      <Tbody>
        {stockUsageList.slice(0, 10).map((data) => (
          <Tr key={data.id}>
            <Td w={{ base: "15%", md: "10%" }}>
              <Checkbox
                isChecked={checkedList.includes(data.id)}
                onChange={(e) => { onChangeCheckbox(e, data.id); }}
              />
            </Td>
            <Td w={{ base: "25%", md: "25%" }}>{data.name}</Td>
            <Td w={{ base: "15%", md: "10%" }}>{data.remain}<b>%</b></Td>
            <Td w={{ base: "15%", md: "10%" }}>{data.quantity}<b>コ</b></Td>
            <Td
              display={{ base: "none", md: "table-cell" }}
              w={{ base: "0%", md: "15%" }}
            >
              {data.per_rate}<b>%</b>
            </Td>
            <Td w={{ base: "30%", md: "20%" }}>
              <Flex>
                <DefaultNumberInput
                  value={data.used_rate}
                  onChange={(v) => { onChangeUsedRate(v, data.id); }}
                  size="xs"
                  max={data.remain}
                  unit="%"
                />
              </Flex>
            </Td>
            <Td
              display={{ base: "none", md: "table-cell" }}
              w={{ base: "0%", md: "10%" }}
            >
              <Flex>
                <MinusButton
                  size="xs"
                  onClick={() => { onClickAddRateButton(data.id, true); }}
                />
                <AddButton
                  size="xs"
                  onClick={() => { onClickAddRateButton(data.id); }}
                />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
