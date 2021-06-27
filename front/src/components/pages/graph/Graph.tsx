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

export const Graph: VFC = memo(() => {
  const { isLogin } = useUserApi();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [graphData, setGraphData] = useState<GraphDataType | null>(null);
  const [loading, setLoading] = useState(false);

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
            <GraphParamForm
              setGraphData={setGraphData}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HeaderLayout>
  );
});
