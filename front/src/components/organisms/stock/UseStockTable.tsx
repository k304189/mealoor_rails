import { memo, VFC } from "react";
import { Checkbox, Table, Thead, Tbody, Tr, Td } from "@chakra-ui/react";

import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { Stock } from "../../../types/api/stock";

type Props = {
  useStocks: Array<Stock>;
};

export const UseStockTable: VFC<Props> = memo((props) => {
  const { useStocks } = props;
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Td>食材名</Td>
          <Td>残量</Td>
          <Td>使用量</Td>
        </Tr>
      </Thead>
      <Tbody>
        {useStocks.slice(0, 10).map((data) => (
          <Tr key={data.id}>
            <Td>{data.name}</Td>
            <Td>{data.remain}<b>%</b></Td>
            <Td>
              <DefaultNumberInput
                value={30}
                onChange={() => {}}
                size="xs"
                max={100}
                unit="%"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
});
