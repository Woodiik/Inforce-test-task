import { useState } from 'react';
import ReactDOM from 'react-dom';

export const EditProductModal = ({
  product,
  onRequestClose,
  onSave,
  onDetailsClose,
}) => {
  const portalRoot = document.querySelector('#modal-root');
  // eslint-disable-next-line no-unused-vars
  const [_, setEditedProduct] = useState(product);
  const [formData, setFormData] = useState({
    name: product.name,
    count: product.count,
    weight: product.weight,
    width: product.width,
    height: product.height,
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

  return ReactDOM.createPortal(
    <div>
      <label>
        Name
        <input
          onChange={handleInputChange}
          value={formData.name}
          type="text"
          name="name"
        />
      </label>
      <label>
        Count
        <input
          onChange={handleInputChange}
          value={formData.count}
          type="number"
          name="count"
        />
      </label>
      <label>
        Weight
        <input
          onChange={handleInputChange}
          value={formData.weight}
          type="number"
          name="weight"
        />
      </label>
      <label>
        Width
        <input
          onChange={handleInputChange}
          value={formData.width}
          type="number"
          name="width"
        />
      </label>
      <label>
        Height
        <input
          onChange={handleInputChange}
          value={formData.height}
          type="number"
          name="height"
        />
      </label>
      <div>
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={handleSave}>Confirm</button>
      </div>
    </div>,
    portalRoot
  );
};
