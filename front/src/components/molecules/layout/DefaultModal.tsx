import { memo, ReactNode, VFC } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { PrimaryButton } from "../../atoms/button/PrimaryButton";

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  buttonTitle: string;
  buttonDisabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | "6xl";
  onClick: () => void;
};

export const DefaultModal: VFC<Props> = memo((props) => {
  const {
    children,
    isOpen,
    onClose,
    modalTitle,
    buttonTitle,
    buttonDisabled = false,
    loading = false,
    size = "md",
    onClick,
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
        <ModalFooter>
          <PrimaryButton
            disabled={buttonDisabled}
            loading={loading}
            onClick={onClick}
          >
            {buttonTitle}
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
