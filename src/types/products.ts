interface ProductProps {
  id: string;
  name: string;
  category: string;
  quantity: number;
  cost: number;
  price: number;
  status: string;
  // Opcional: handlers
  onEdit: () => void;
  onDelete: () => void;
  onCheckbox: () => void;
}