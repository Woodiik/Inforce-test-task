export const ProductItem = ({ product, onClick, onDeleteBtnClick }) => {
  return (
    <li onClick={() => onClick(product)}>
      <img alt="ProductPhoto" src={product.imageUrl} />
      <h3>{product.name}</h3>
      <button type="button" onClick={() => onDeleteBtnClick(product)}>
        Delete
      </button>
    </li>
  );
};
