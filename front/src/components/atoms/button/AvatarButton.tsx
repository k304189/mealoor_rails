import { memo, VFC } from "react";
import { Avatar, Box } from "@chakra-ui/react";

type Props = {
  size?: "sm" | "md" | "lg" | "xs";
  src?: string;
  onClick?: () => void;
};

export const AvatarButton: VFC<Props> = memo((props) => {
  const { size = "md", src = "", onClick = () => {} } = props;

  return (
    <Box onClick={onClick}>
      <Avatar
        bg="blue.700"
        src={src}
        size={size}
        _hover={{ cursor: "pointer" }}
      />
    </Box>
  );
});
