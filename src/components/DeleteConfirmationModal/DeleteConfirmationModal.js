import React from 'react';
import ReactDOM from 'react-dom';

export const DeleteConfirmationModal = ({ onRequestClose, onConfirm }) => {
  const portalRoot = document.querySelector('#modal-root');

  const handleConfirm = () => {
    onConfirm();
    onRequestClose();
  };

  return ReactDOM.createPortal(
    <div>
      <p>Are you sure you want to delete this product?</p>
      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={onRequestClose}>Cancel</button>
    </div>,
    portalRoot
  );
};
