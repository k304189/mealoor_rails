import { ChangeEvent, memo, useState, VFC } from "react";
import {
  Box,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { DefaultCheckbox } from "../../atoms/button/DefaultCheckbox";
import { DefaultNumberInput } from "../../molecules/input/DefaultNumberInput";
import { AddButton } from "../../molecules/button/AddButton";
import { MinusButton } from "../../molecules/button/MinusButton";
import { StockUsage } from "../../../types/pages/stock/stockUsage";

import { RadioUseType } from "../input/usage/RadioUseType";

type Props = {
  stockUsageList: Array<StockUsage>;
  checkedList: Array<number>;
  useType: string;
  setUseType: (v: string) => void;
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
  onChangeUsedRate: (value: number, id: number) => void;
  onClickUseButton: () => void;
};

export const StockUsageTable: VFC<Props> = memo((props) => {
  const [usagePagingOffset, setUsagePagingOffset] = useState(0);

  const {
    stockUsageList,
    checkedList,
    useType,
    setUseType,
    onChangeCheckbox,
    onChangeUsedRate,
    onClickUseButton,
  } = props;

  const onClickAddRateButton = (id: number, isMinus = false) => {
    const index = stockUsageList.findIndex((data) => data.id === id);
    if (index > -1) {
      const { remain, per_rate } = stockUsageList[index];
      let usedRate = stockUsageList[index].use_rate;
      if (isMinus) {
        usedRate = ((usedRate - per_rate * 2) > 0) ? usedRate - per_rate : 0;
      } else {
        usedRate = ((usedRate + per_rate * 2) > remain) ? remain : usedRate + per_rate;
      }
      onChangeUsedRate(usedRate, id);
    }
  };

  const usagePagingDisplayNum = 10;
  const onChangeUsagePage = (page: {selected: number}) =>
    setUsagePagingOffset(usagePagingDisplayNum * page.selected);

  return (
    <>
      <Box h="50%">
        <Flex>
          <Box className="sectionTitle" my={0}>
            ???????????????
          </Box>
          <Spacer />
          <DefaultPaging
            displayNum={usagePagingDisplayNum}
            dataNum={stockUsageList.length}
            onPageChange={onChangeUsagePage}
          />
        </Flex>
        <Table size="sm">
          <Thead>
            <Tr>
              <Td w={{ base: "15%", md: "8%" }} />
              <Td w={{ base: "25%", md: "21%" }}>?????????</Td>
              <Td w={{ base: "15%", md: "12%" }}>??????</Td>
              <Td w={{ base: "15%", md: "12%" }}>??????</Td>
              <Td
                display={{ base: "none", md: "table-cell" }}
                w={{ base: "0%", md: "17%" }}
              >
                ??????1???
              </Td>
              <Td w={{ base: "30%", md: "20%" }}>?????????</Td>
              <Td
                display={{ base: "none", md: "table-cell" }}
                w={{ base: "0%", md: "10%" }}
              />
            </Tr>
          </Thead>
          <Tbody>
            {stockUsageList
              .slice(usagePagingOffset, usagePagingOffset + usagePagingDisplayNum)
              .map((data) => (
                <Tr key={data.id}>
                  <Td w={{ base: "15%", md: "8%" }}>
                    <DefaultCheckbox
                      isChecked={checkedList.includes(data.id)}
                      tooltipText="??????????????????"
                      onChange={(e) => { onChangeCheckbox(e, data.id); }}
                    />
                  </Td>
                  <Td w={{ base: "25%", md: "20%" }}>{data.name}</Td>
                  <Td w={{ base: "15%", md: "12%" }}>{data.remain}<b>%</b></Td>
                  <Td w={{ base: "15%", md: "13%" }}>{data.quantity}<b>???</b></Td>
                  <Td
                    display={{ base: "none", md: "table-cell" }}
                    w={{ base: "0%", md: "17%" }}
                  >
                    {data.per_rate}<b>%</b>
                  </Td>
                  <Td w={{ base: "30%", md: "22%" }}>
                    <Flex>
                      <DefaultNumberInput
                        value={data.use_rate}
                        onChange={(v) => { onChangeUsedRate(v, data.id); }}
                        size="xs"
                        max={data.remain}
                        unit="%"
                      />
                    </Flex>
                  </Td>
                  <Td
                    display={{ base: "none", md: "table-cell" }}
                    w={{ base: "0%", md: "8%" }}
                  >
                    <Flex>
                      <MinusButton
                        size="xs"
                        tooltipText="1????????????????????????"
                        onClick={() => { onClickAddRateButton(data.id, true); }}
                      />
                      <AddButton
                        size="xs"
                        tooltipText="1????????????????????????"
                        onClick={() => { onClickAddRateButton(data.id); }}
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Flex mt={5} align="end">
          <RadioUseType useType={useType} onChange={setUseType} />
          <PrimaryButton onClick={onClickUseButton}>
            {useType}
          </PrimaryButton>
        </Flex>
      </Box>
    </>
  );
});
