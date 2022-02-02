import React from 'react';
import { DialogContent, DialogOverlay } from '@reach/dialog';
import './styles/index.css';
import { CloseIcon } from '../icons/Close';
export const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => (
  <DialogOverlay isOpen onDismiss={onClose}>
    <div data-reach-dialog-area>
      <DialogContent
        data-reach-dialog-content
        {...{ 'aria-label': 'Dialog area' }}
      >
        <div data-reach-dialog-header>
          <button
            type="button"
            aria-label="Close Modal"
            onClick={onClose}
            data-reach-dialog-button-close
          >
            <CloseIcon width="14" />
          </button>
        </div>
        <div data-reach-dialog-body>{children}</div>
      </DialogContent>
    </div>
  </DialogOverlay>
);
