import styles from './product.module.css';

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

  return (
    <li className={styles.productItem}>
      <input type="checkbox" onChange={onCheckbox} />
      <p>{name}</p>
      <p>{category}</p>
      <p>{id}</p>
      <p>{quantity}</p>
      <p>{cost} USD</p>
      <p>{price} USD</p>
      <p>{status}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}