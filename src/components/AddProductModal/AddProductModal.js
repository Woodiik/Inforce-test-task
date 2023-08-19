import { useState } from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';

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
      imageUrl: '...',
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
        <button onClick={handleApproveClick}>Confirm</button>
      </div>
    </div>,
    portalRoot
  );
};
