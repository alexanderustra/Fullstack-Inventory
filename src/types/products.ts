interface ProductProps {
  id: string;
  name: string;
  category: string;
  quantity: number;
  cost: number;
  price: number;
  status: boolean;
  // Opcional: handlers
  onEdit: () => void;
  onDelete: () => void;
  onCheckbox: () => void;
}