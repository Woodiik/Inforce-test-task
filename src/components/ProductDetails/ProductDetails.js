import { EditProductModal } from 'components/EditProductModal/EditProductModal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductAction } from 'redux/productSlice';

export const ProductDetails = ({ product, onDetailsClose }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const dispatch = useDispatch();

  const handleProductUpdate = updatedProduct => {
    dispatch(updateProductAction(updatedProduct));
  };

  return (
    <div>
      <img alt="#" src={product.imageUrl} />
      <h3>{product.name}</h3>
      <div>Count: {product.count}</div>
      <div>Weight: {product.weight}</div>
      <div>
        Size:
        {
          <ul>
            <li>Width: {product.size.width}</li>
            <li>Height: {product.size.height}</li>
          </ul>
        }
      </div>
      <button onClick={() => setShowEditModal(true)} type="button">
        Edit
      </button>
      {showEditModal && (
        <EditProductModal
          product={product}
          onRequestClose={() => setShowEditModal(false)}
          onSave={handleProductUpdate}
          onDetailsClose={onDetailsClose}
        />
      )}
    </div>
  );
};
