import {
  Badge,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
  require?: "require" | "optional";
  label: string;
  labelSize?: string;
  helperMsg?: string;
  errorMsg?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
};

export const DefaultInputForm: VFC<Props> = memo((props) => {
  const {
    children,
    require = "",
    label,
    labelSize = "xs",
    helperMsg = "",
    errorMsg = "",
    isDisabled = false,
    isInvalid = false,
    isReadOnly = false,
  } = props;
  let badgeColor = "";
  let badgeLagel = "";

  if (require === "require") {
    badgeColor = "red";
    badgeLagel = "必須";
  } else if (require === "optional") {
    badgeColor = "gray";
    badgeLagel = "任意";
  }

  return (
    <FormControl
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isReadOnly={isReadOnly}
    >
      <FormLabel fontSize={labelSize}>
        {label}
        <Badge ml={2} colorScheme={badgeColor}>{badgeLagel}</Badge>
      </FormLabel>
      {children}
      <FormHelperText>{helperMsg}</FormHelperText>
      <FormErrorMessage>{errorMsg}</FormErrorMessage>
    </FormControl>
  );
});
