import { ChangeEvent, memo, useState, VFC } from "react";
import {
  Flex,
  HStack,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import {
  faBell,
  faTimes,
  faSquareFull,
} from "@fortawesome/free-solid-svg-icons";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { DefaultPaging } from "../../atoms/button/DefaultPaging";
import { DefaultLink } from "../../atoms/button/DefaultLink";
import { DefaultCheckbox } from "../../atoms/button/DefaultCheckbox";
import { DefaultFontIcon } from "../../atoms/icon/DefaultFontIcon";
import { Stock } from "../../../types/api/stock";

type Props = {
  havingStocks: Array<Stock>;
  checkedList: Array<number>;
  openEditModal: () => void;
  onClickNameLink: (id: number) => void;
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, id: number) => void;
};

export const HavingStockTable: VFC<Props> = memo((props) => {
  const TYPE_PASSED = "passed";
  const TYPE_NEARLY = "nealry";
  const [havingPagingOffset, setHavingPagingOffset] = useState(0);
  const {
    havingStocks,
    checkedList,
    openEditModal,
    onClickNameLink,
    onChangeCheckbox,
  } = props;

  const getDiffDaysFromToday = (targetDate: string) => {
    const splitedTarget = targetDate.split("-").map(Number);
    const target = new Date(splitedTarget[0], splitedTarget[1] - 1, splitedTarget[2]);
    const diff = (
      (target.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;
    return diff;
  };

  const getDiffDaysType = (targetDate: string) => {
    const dateDiff = getDiffDaysFromToday(targetDate);
    let type = "";
    if (dateDiff < 0) {
      type = TYPE_PASSED;
    } else if (dateDiff >= 0 && dateDiff < 3) {
      type = TYPE_NEARLY;
    }
    return type;
  };

  const getTrClassName = (limitStr: string) => {
    const type = getDiffDaysType(limitStr);
    let className;
    if (type === TYPE_PASSED) {
      className = "passedLimitRow";
    } else if (type === TYPE_NEARLY) {
      className = "nearlyLimitRow";
    } else {
      className = "";
    }
    return className;
  };

  const getLimitIcon = (limitStr: string) => {
    const type = getDiffDaysType(limitStr);
    let icon = faSquareFull;
    if (type === TYPE_PASSED) {
      icon = faTimes;
    } else if (type === TYPE_NEARLY) {
      icon = faBell;
    }
    return icon;
  };

  const getLimitIconTooltip = (limitStr: string) => {
    const type = getDiffDaysType(limitStr);
    let tooltipText = "";
    if (type === TYPE_PASSED) {
      tooltipText = "賞味期限が過ぎています";
    } else if (type === TYPE_NEARLY) {
      tooltipText = "賞味期限が近づいています";
    }
    return tooltipText;
  };

  const getLimitIconColor = (limitStr: string) => {
    const type = getDiffDaysType(limitStr);
    let color = "transparent";
    if (type === TYPE_PASSED) {
      color = "gray.600";
    } else if (type === TYPE_NEARLY) {
      color = "red.500";
    }
    return color;
  };

  const havingPagingDisplayNum = 10;
  const onChangeHavingPage = (page: {selected: number}) =>
    setHavingPagingOffset(havingPagingDisplayNum * page.selected);

  return (
    <>
      <Flex>
        <PrimaryButton size="sm" onClick={() => { openEditModal(); }}>食材追加</PrimaryButton>
        <Spacer />
        <DefaultPaging
          displayNum={havingPagingDisplayNum}
          dataNum={havingStocks.length}
          onPageChange={onChangeHavingPage}
        />
      </Flex>
      <Table className="HavingStockTable" size="sm">
        <Thead>
          <Tr>
            <Td>選択</Td>
            <Td>食材名</Td>
            <Td display={{ base: "none", md: "table-cell" }}>カテゴリー</Td>
            <Td display={{ base: "none", md: "table-cell" }}>賞味期限</Td>
            <Td display={{ base: "none", md: "table-cell" }}>価格</Td>
            <Td display={{ base: "none", md: "table-cell" }}>カロリー</Td>
            <Td>残量</Td>
          </Tr>
        </Thead>
        <Tbody>
          {havingStocks
            .slice(havingPagingOffset, havingPagingOffset + havingPagingDisplayNum)
            .map((data) => (
              <Tr key={data.id} className={getTrClassName(data.limit)}>
                <Td>
                  <HStack spacing={3}>
                    <DefaultCheckbox
                      isChecked={checkedList.includes(data.id)}
                      tooltipText="選択中食材に追加・解除する"
                      onChange={(e) => { onChangeCheckbox(e, data.id); }}
                      borderColor="#228B22"
                    />
                    { getLimitIcon(data.limit) ? (
                      <DefaultFontIcon
                        icon={getLimitIcon(data.limit)}
                        tooltipText={getLimitIconTooltip(data.limit)}
                        color={getLimitIconColor(data.limit)}
                      />
                    ) : (
                      <></>
                    ) }
                  </HStack>
                </Td>
                <Td>
                  <DefaultLink
                    tooltipText="詳細画面へ"
                    onClick={() => { onClickNameLink(data.id); }}
                  >
                    {data.name}
                  </DefaultLink>
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>{data.category}</Td>
                <Td
                  className="limitColumn"
                  display={{ base: "none", md: "table-cell" }}
                >
                  {data.limit}
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {data.price
                    ? `${data.price.toLocaleString()}円`
                    : ""}
                </Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {data.kcal
                    ? `${data.kcal.toLocaleString()}kcal`
                    : ""}
                </Td>
                <Td>{data.remain}<b>%</b></Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
});
