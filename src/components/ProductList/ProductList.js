import React, { useState } from 'react';
import { ProductItem } from 'components/ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelector } from 'redux/selectors';
import { ProductDetails } from 'components/ProductDetails/ProductDetails';
import { AddProductModal } from 'components/AddProductModal/AddProductModal';
import { addProductAction, removeProductAction } from 'redux/productSlice';
import { DeleteConfirmationModal } from 'components/DeleteConfirmationModal/DeleteConfirmationModal';
import { AddBtn, List } from './ProductList.styled';

export const ProductList = () => {
  const products = useSelector(productsSelector);
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductToDelete, setSelectedProductToDelete] = useState(null);

  const handleProductClick = product => {
    setSelectedProduct(product);
  };

  async function deleteProductOnServer(productId) {
    try {
      const response = await fetch(
        `http://localhost:4000/products/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete product on server');
      }
    } catch (error) {
      console.error('Error deleting product on server:', error);
      throw error;
    }
  }

  const handleDeleteConfirm = async () => {
    if (selectedProductToDelete) {
      const productIdToDelete = selectedProductToDelete.id;

      try {
        await deleteProductOnServer(productIdToDelete);
        dispatch(removeProductAction(productIdToDelete));
        setSelectedProductToDelete(null);
        setShowDeleteModal(false);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };
  const toggleDeleteModal = product => {
    setSelectedProductToDelete(product);
    setShowDeleteModal(!showDeleteModal);
  };

  const onModalApprove = async newProduct => {
    try {
      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      dispatch(addProductAction(newProduct));
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <AddBtn onClick={() => setShowModal(true)} type="button">
        Add Product
      </AddBtn>
      <List>
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onClick={handleProductClick}
            onDeleteBtnClick={toggleDeleteModal}
          />
        ))}
      </List>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onDetailsClose={() => setSelectedProduct(null)}
        />
      )}
      {showModal && (
        <AddProductModal
          onRequestClose={() => setShowModal(false)}
          onApprove={onModalApprove}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onRequestClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
};
