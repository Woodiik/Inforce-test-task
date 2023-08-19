import { DeleteBtn, Item } from './ProductItem.styled';

export const ProductItem = ({ product, onClick, onDeleteBtnClick }) => {
  return (
    <Item onClick={() => onClick(product)}>
      <img
        alt="ProductPhoto"
        src={
          product.imageUrl ||
          'https://img.freepik.com/free-photo/neutral-tone-texture-abstract-background_53876-96900.jpg?w=1380&t=st=1692457502~exp=1692458102~hmac=a5be57c34a78eb6df699a3713bf56ac6adc891c04e4e115f710fbce05e1ffea6'
        }
        width="274"
        height="176"
      />
      <h3>{product.name}</h3>
      <DeleteBtn type="button" onClick={() => onDeleteBtnClick(product)}>
        Delete
      </DeleteBtn>
    </Item>
  );
};
