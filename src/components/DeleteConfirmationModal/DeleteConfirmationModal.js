import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  ApproveBtn,
  Backdrop,
  BtnContainer,
  CancelBtn,
  Container,
} from './DeleteConfirmationModal.styled';

export const DeleteConfirmationModal = ({ onRequestClose, onConfirm }) => {
  const portalRoot = document.querySelector('#modal-root');

  const handleConfirm = () => {
    onConfirm();
    onRequestClose();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onRequestClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return ReactDOM.createPortal(
    <Backdrop>
      <Container>
        <p>Are you sure you want to delete this product?</p>
        <BtnContainer>
          <ApproveBtn onClick={handleConfirm}>Confirm</ApproveBtn>
          <CancelBtn onClick={onRequestClose}>Cancel</CancelBtn>
        </BtnContainer>
      </Container>
    </Backdrop>,
    portalRoot
  );
};
