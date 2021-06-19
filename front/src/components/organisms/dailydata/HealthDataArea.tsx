import { memo, VFC } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

import { DefaultLink } from "../../atoms/button/DefaultLink";
import { Health } from "../../../types/api/health";

type Props = {
  healthData?: Health | null;
  onClickHealthLink: () => void;
}

export const HealthDataArea: VFC<Props> = memo((props) => {
  const { healthData = null, onClickHealthLink } = props;

  return (
    <Box>
      <Box className="sectionTitle">
        体調
      </Box>
      { healthData ? (
        <Table size="sm">
          <Thead>
            <Tr>
              <Td>日付</Td>
              <Td>体重</Td>
              <Td>体脂肪率</Td>
              <Td>体脂肪量</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <DefaultLink onClick={onClickHealthLink}>
                  {healthData.recording_date}
                </DefaultLink>
              </Td>
              <Td>{`${healthData.weight}kg`}</Td>
              <Td>{`${healthData.fat_percent}%`}</Td>
              <Td>{`${healthData.fat_weight}kg`}</Td>
            </Tr>
          </Tbody>
        </Table>
      ) : (
        <Box>本日の体調は登録されていません</Box>
      )}
    </Box>
  );
});
