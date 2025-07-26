import React, { useState } from "react";
import styles from "./product.module.css";

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  cost: number;
  price: number;
  status: boolean;
  onCheckbox: () => void;
}

interface ProductRowProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onDelete: () => void;
  onCheckbox: () => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  onSave,
  onDelete,
  onCheckbox,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product>(product);

  const [originalProduct, setOriginalProduct] = useState<Product>(product);

  const handleChange = (
    field: keyof Product,
    value: string | number | boolean
  ) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(editedProduct);
    setOriginalProduct(editedProduct); 
  };

  const handleCancel = () => {
  setEditedProduct(originalProduct); // Restaura valores originales
  setIsEditing(false); // Sale del modo edición
};


  const fields: Array<{
    field: keyof Product;
    type: "text" | "number" | "boolean";
  }> = [
    { field: "name", type: "text" },
    { field: "category", type: "text" },
    { field: "quantity", type: "number" },
    { field: "cost", type: "number" },
    { field: "price", type: "number" },
    { field: "status", type: "boolean" },
  ];

  return (
    <div className={styles.productRow}>
      {/* ID - no editable */}
      <input type="checkbox" onChange={onCheckbox} />
      <p>{product.id}</p>

      {fields.map(({ field, type }) => (
        <p key={field}>
          {" "}
          {isEditing ? (
            type === "boolean" ? (
              <span
                onClick={() =>
                  handleChange(field, !(editedProduct[field] as boolean))
                }
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: (editedProduct[field] as boolean) ? "green" : "red",
                }}
              >
                {(editedProduct[field] as boolean) ? "Activo" : "Inactivo"}
              </span>
            ) : (
              <input
                type={type}
                value={String(editedProduct[field])}
                onChange={(e) =>
                  handleChange(
                    field,
                    type === "number" ? Number(e.target.value) : e.target.value
                  )
                }
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  width: "100%",
                }}
              />
            )
          ) : (
            <span>
              {type === "boolean"
                ? (editedProduct[field] as boolean)
                  ? "Activo"
                  : "Inactivo"
                : String(editedProduct[field])}
            </span>
          )}
        </p>
      ))}

      {/* Acciones */}
      {isEditing ? (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default ProductRow;
