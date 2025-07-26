import { useEffect, useState } from "react";
import Product from "./Product";
import productsData from "../../data/products.json";
import styles from "./productList.module.css";

interface ProductListProps {
  search: string;
  filterOptions: {
    sortBy: null | "id" | "cost" | "price";
    sortOrder: "asc" | "desc";
    status: "all" | "active" | "inactive";
    category: string;
  };
}

export default function ProductList({
  search,
  filterOptions,
}: ProductListProps) {
  const [products, setProducts] = useState(productsData);
  const filteredProducts = products
    .filter((product) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(searchLower) ||
        product.id.toLowerCase().includes(searchLower);

      const matchesStatus =
        filterOptions.status === "all" ||
        (filterOptions.status === "active" && product.status) ||
        (filterOptions.status === "inactive" && !product.status);

      const matchesCategory =
        filterOptions.category === "all" ||
        product.category === filterOptions.category;

      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      const { sortBy, sortOrder } = filterOptions;
      if (!sortBy) return 0;

      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterOptions]);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const manageSelectedProducts = (array: string[], id: string) => {
    if (array.includes(id)) {
      return array.filter((item) => item !== id);
    } else {
      return [...array, id];
    }
  };

  const handleCheckbox = (array: string[], id: string) => {
    setSelectedProducts(manageSelectedProducts(array, id));
  };

  useEffect(() => {
    console.log(selectedProducts);
  }, [selectedProducts]);

  const handleDelete = (id?: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) =>
        id ? product.id !== id : !selectedProducts.includes(product.id)
      )
    );

    if (id) {
      setSelectedProducts((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedProducts([]);
    }
  };
  return (
    <div>
      <ul className={styles.listContainer}>
        <button onClick={() => handleDelete()}>Delete selected</button>
        {currentProducts.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            quantity={product.quantity}
            cost={product.cost}
            price={product.price}
            status={product.status}
            onEdit={() => console.log("Edit", product.id)}
            onDelete={() => handleDelete(product.id)}
            onCheckbox={() => handleCheckbox(selectedProducts, product.id)}
          />
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          ← Prev
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next →
        </button>
      </div>
    </div>
  );
}
