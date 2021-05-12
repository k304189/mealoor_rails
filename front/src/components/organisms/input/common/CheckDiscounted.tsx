import { ChangeEvent, memo, VFC } from "react";
import { Box, Checkbox } from "@chakra-ui/react";

type Props = {
  discounted: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CheckDiscounted: VFC<Props> = memo((props) => {
  const { discounted, onChange } = props;
  return (
    <Box
      position="relative"
      height="100%"
    >
      <Box
        position="absolute"
        bottom="5px"
      >
        <Checkbox
          isChecked={discounted}
          onChange={onChange}
          size="lg"
          colorScheme="green"
        >
          割引
        </Checkbox>
      </Box>
    </Box>
  );
});
