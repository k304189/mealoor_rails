import { memo, ReactNode, useRef, VFC } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  HStack,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  headerTitle?: string;
  noButtonTitle?: string;
  yesButtonTitle?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl";
  onClose: () => void;
  onClick: () => void;
};

export const DefaultDialog: VFC<Props> = memo((props) => {
  const cancelRef = useRef(null);
  const {
    children,
    isOpen,
    headerTitle = "",
    noButtonTitle = "いいえ",
    yesButtonTitle = "はい",
    size = "md",
    onClose,
    onClick,
  } = props;
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      autoFocus={false}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      size={size}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader as="div" color="gray.800">{headerTitle}</AlertDialogHeader>
        <AlertDialogBody>
          {children}
        </AlertDialogBody>
        <AlertDialogFooter>
          <HStack spacing="10px">
            <SecondaryButton onClick={onClose}>{noButtonTitle}</SecondaryButton>
            <PrimaryButton onClick={onClick}>{yesButtonTitle}</PrimaryButton>
          </HStack>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});
