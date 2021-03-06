import { ChangeEvent, memo, VFC } from "react";
import { Input } from "@chakra-ui/react";

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  size?: "xs" | "sm" | "md" | "lg";
  type?: string;
  placeholder?: string;
  focusBorderColor?: string;
  onBlur?: () => void;
};

export const DefaultInput: VFC<Props> = memo((props) => {
  const { value,
    onChange,
    placeholder = "",
    type = "text",
    focusBorderColor = "#7FDC96",
    size = "md",
    onBlur = () => {},
  } = props;

  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      focusBorderColor={focusBorderColor}
      onBlur={onBlur}
      size={size}
      variant="flushed"
    />
  );
});
