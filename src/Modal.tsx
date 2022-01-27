import * as React from 'react';
import { CloseIcon } from './icons/Close';
import {
  Body,
  ButtonCloseStyled,
  Header,
  ModalArea,
  ModalContent,
  ModalOverlay,
} from './styles';

export const Modal = ({
  children,
  visible,
  onCancel,
  onDismiss,
}: {
  children: React.ReactNode;
  visible: boolean;
  onCancel?: () => void;
  onDismiss?: () => void;
}) =>
  visible ? (
    <ModalOverlay isOpen={visible} onDismiss={onDismiss ?? onCancel}>
      <ModalArea>
        <ModalContent {...{ 'aria-label': 'Dialog area' }}>
          <Header>
            <ButtonCloseStyled
              aria-label="Close Modal"
              onClick={onDismiss ?? onCancel}
            >
              <CloseIcon width="14" />
            </ButtonCloseStyled>
          </Header>
          <Body>{children}</Body>
        </ModalContent>
      </ModalArea>
    </ModalOverlay>
  ) : null;
