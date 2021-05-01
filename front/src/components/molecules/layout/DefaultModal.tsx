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
  onClick: () => void;
};

export const DefaultModal: VFC<Props> = memo((props) => {
  const {
    children,
    isOpen,
    onClose,
    modalTitle,
    buttonTitle,
    onClick,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader bg="#7FDC96" color="#FCFDFE">{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={4}>
          {children}
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClick}>{buttonTitle}</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
