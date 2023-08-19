import { useState } from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import {
  ApproveBtn,
  Backdrop,
  BtnContainer,
  CancelBtn,
  Container,
  Label,
} from './AddProductModal.styled';
import { useEffect } from 'react';

export const AddProductModal = ({ onRequestClose, onApprove }) => {
  const portalRoot = document.getElementById('modal-root');
  const [formData, setFormData] = useState({
    name: '',
    count: 0,
    weight: 0,
    width: 0,
    height: 0,
  });
  const handleApproveClick = () => {
    const { name, count, width, height, weight } = formData;
    const newProduct = {
      id: nanoid(),
      imageUrl: null,
      name,
      count,
      size: {
        width,
        height,
      },
      weight,
    };

    onApprove(newProduct);

    onRequestClose();
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
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
        <Label>
          Name
          <input
            onChange={handleInputChange}
            value={formData.name}
            type="text"
            name="name"
          />
        </Label>
        <Label>
          Count
          <input
            onChange={handleInputChange}
            value={formData.count}
            type="number"
            name="count"
          />
        </Label>
        <Label>
          Weight
          <input
            onChange={handleInputChange}
            value={formData.weight}
            type="number"
            name="weight"
          />
        </Label>
        <Label>
          Width
          <input
            onChange={handleInputChange}
            value={formData.width}
            type="number"
            name="width"
          />
        </Label>
        <Label>
          Height
          <input
            onChange={handleInputChange}
            value={formData.height}
            type="number"
            name="height"
          />
        </Label>
        <BtnContainer>
          <CancelBtn onClick={onRequestClose}>Cancel</CancelBtn>
          <ApproveBtn onClick={handleApproveClick}>Confirm</ApproveBtn>
        </BtnContainer>
      </Container>
    </Backdrop>,
    portalRoot
  );
};
