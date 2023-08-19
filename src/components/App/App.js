import { ProductList } from 'components/ProductList/ProductList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProductAction } from 'redux/productSlice';
import { Container } from './App.styled';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:4000/products');
      const data = await res.json();
      data.forEach(product => {
        dispatch(addProductAction(product));
      });
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <Container>
      <h1>Product list</h1>
      <ProductList />
    </Container>
  );
};
