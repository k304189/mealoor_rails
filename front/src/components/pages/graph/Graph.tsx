import { memo, useEffect, useState, VFC } from "react";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { GraphParamForm } from "../../organisms/graph/GraphParamForm";
import { HeaderLayout } from "../../templates/HeaderLayout";

import { useUserApi } from "../../../hooks/user/useUserApi";
import { useMessage } from "../../../hooks/common/useMessage";
import { GraphDataType } from "../../../types/pages/graph/graphDataType";

const rand = () => Math.round(Math.random() * 20 - 10);

const data = {
  labels: [
    "2021/6/1", "2021/6/2", "2021/6/3", "2021/6/4", "2021/6/5",
    "2021/6/6", "2021/6/7", "2021/6/8", "2021/6/9", "2021/6/10",
    "2021/6/11", "2021/6/12", "2021/6/13", "2021/6/14", "2021/6/15",
    "2021/6/16", "2021/6/17", "2021/6/18", "2021/6/19", "2021/6/20",
    "2021/6/21", "2021/6/22", "2021/6/23", "2021/6/24", "2021/6/25",
    "2021/6/26", "2021/6/27", "2021/6/28", "2021/6/29", "2021/6/30",
  ],
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "white",
      borderWidth: 2,
      data: [
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
      ],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(255, 99, 132)",
      data: [
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
      ],
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(75, 192, 192)",
      data: [
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
      ],
      borderColor: "white",
    },
    {
      type: "bar",
      label: "Dataset 4",
      backgroundColor: "rgb(255, 0, 0)",
      data: [
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
      ],
      borderColor: "white",
    },
    {
      type: "bar",
      label: "Dataset 5",
      backgroundColor: "rgb(0, 0, 255)",
      data: [
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
        rand(), rand(), rand(), rand(), rand(),
      ],
      borderColor: "white",
    },
  ],
};

export const Graph: VFC = memo(() => {
  const { isLogin } = useUserApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [graphData, setGraphData] = useState<GraphDataType | null>(null);
  const [loading, setLoading] = useState(false);

  const onClickGetGraph = () => {
    setGraphData(data);
  };

  useEffect(() => {
    setLoading(true);
    isLogin()
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <HeaderLayout loading={loading} title="食事グラフ">
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }} h="100%">
        <Box
          as="article"
          h="100%"
          w="100%"
        >
          <PrimaryButton onClick={onOpen}>グラフ</PrimaryButton>
          <Box h="90%">
            <Bar data={graphData} type="bar" options={{ maintainAspectRatio: false }} />
          </Box>
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <GraphParamForm onClick={onClickGetGraph} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HeaderLayout>
  );
});
