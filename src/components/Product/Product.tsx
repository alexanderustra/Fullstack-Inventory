import styles from './product.module.css';
import ProductRow from './ProductRow';

export default function Product({
  id,
  name,
  category,
  quantity,
  cost,
  price,
  status,
  onEdit,
  onDelete,
  onCheckbox
}: ProductProps) {
  
   const productData = {
    id,
    name,
    category,
    quantity,
    cost,
    price,
    status,
    onCheckbox
  };

  return (
    <li className={styles.productItem}>
      <ProductRow
        onCheckbox = {onCheckbox}
        product={productData}
        onSave={onEdit}
        onDelete={onDelete}
      />
    </li>
  );
}