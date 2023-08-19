import { useEffect } from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ApproveBtn,
  Backdrop,
  BtnContainer,
  CancelBtn,
  Container,
  Label,
} from './EditProductModal.styled';

export const EditProductModal = ({
  product,
  onRequestClose,
  onSave,
  onDetailsClose,
}) => {
  const portalRoot = document.querySelector('#modal-root');
  // eslint-disable-next-line no-unused-vars
  const [_, setEditedProduct] = useState(product);
  const { name, count, size, weight } = product;
  const [formData, setFormData] = useState({
    name,
    count,
    weight,
    width: size.width,
    height: size.height,
  });
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSave = async () => {
    const { name, count, width, height, weight } = formData;
    try {
      const updatedProduct = {
        ...product,
        name,
        count,
        size: {
          width,
          height,
        },
        weight,
      };

      const response = await fetch(
        `http://localhost:4000/products/${updatedProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        onSave(updatedProduct);
        onRequestClose();
        onDetailsClose();
      } else {
        console.error('Error updating product');
      }
    } catch (error) {
      console.error('Error updating product', error);
    }
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
          <ApproveBtn onClick={handleSave}>Confirm</ApproveBtn>
        </BtnContainer>
      </Container>
    </Backdrop>,
    portalRoot
  );
};
