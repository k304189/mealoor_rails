import { memo, ReactNode, VFC } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl";
};

export const DefaultModal: VFC<Props> = memo((props) => {
  const {
    children,
    isOpen,
    onClose,
    modalTitle,
    size = "md",
  } = props;
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader as="div" bg="#7FDC96" color="#FCFDFE">{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
