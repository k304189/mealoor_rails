import { ChangeEvent, memo, VFC } from "react";
import { Checkbox, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
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
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Td>選択</Td>
          <Td>食材名</Td>
          <Td>残量</Td>
          <Td>使用量</Td>
        </Tr>
      </Thead>
      <Tbody>
        {stockUsageList.slice(0, 10).map((data) => (
          <Tr key={data.id}>
            <Td>
              <Checkbox
                isChecked={checkedList.includes(data.id)}
                onChange={(e) => { onChangeCheckbox(e, data.id); }}
              />
            </Td>
            <Td>{data.name}</Td>
            <Td>{data.remain}<b>%</b></Td>
            <Td>
              <DefaultNumberInput
                value={data.used_rate}
                onChange={(v) => { onChangeUsedRate(v, data.id); }}
                size="xs"
                max={data.remain}
                unit="%"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
