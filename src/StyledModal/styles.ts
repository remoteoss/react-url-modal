import { DialogOverlay, DialogContent } from '@reach/dialog';
import styled from 'styled-components';

export const ModalOverlay = styled(DialogOverlay)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(23, 18, 55, 0.6);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 999999;
`;

export const ModalArea = styled.div`
  position: relative;
  width: auto;
  max-width: 620px;
  min-height: calc(100% - 100px); /* 100px = 50px * 2 margin */
  margin: 50px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled(DialogContent)`
  outline: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  color: var(--colors-bayoux);
  box-shadow: 0 12px 48px rgba(96, 101, 123, 0.24);
  --modalRadius: 10px;
  border-radius: var(--modalRadius);
  /* Do not add overflow:hidden to allow content to go over the edge (eg dropdowns) */

  && {
    /** override reach-ui */
    width: 100%;
    background: transparent;
    margin: 0;
    padding: 0;
    position: relative;
  }
`;

export const ButtonCloseStyled = styled.button`
  color: #525f7f;
  background: transparent;
  border: none;
  padding: 0;
  margin: 8px;
  cursor: pointer;
`;

export const Body = styled.div`
  --modal-body-spacing-x: 58px;
  --modal-body-spacing-y: 48px;
  position: relative;

  background-color: #fff;
  padding: var(--modal-body-spacing-y) var(--modal-body-spacing-x);

  // Remove vertical margins of existing child DynamicForm, because
  // modal body already provides a generous margin.
  --dynamicFormContainerMargin: 0;

  &:last-child {
    border-radius: var(--modalRadius);
  }
`;

export const Header = styled.header`
  position: absolute;
  background-color: #fff;
  right: 10px;
  top: 10px;
  z-index: 9999;
`;
