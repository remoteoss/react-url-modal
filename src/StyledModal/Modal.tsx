import React from 'react';
import { Content, Overlay, Root, Close } from '@radix-ui/react-dialog';
import './styles/index.css';
import { CloseIcon } from '../icons/Close';
export const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => (
  <Root open>
    <Overlay className="DialogOverlay">
      <div className="DialogArea">
        <Content
          className="DialogContent"
          aria-label="Dialog area"
          onEscapeKeyDown={onClose}
          onPointerDownOutside={onClose}
        >
          <div className="DialogHeader">
            <Close asChild>
              <button
                type="button"
                aria-label="Close Modal"
                onClick={onClose}
                className="DialogButtonClose"
              >
                <CloseIcon width="14" />
              </button>
            </Close>
          </div>
          <div className="DialogBody">{children}</div>
        </Content>
      </div>
    </Overlay>
  </Root>
);
