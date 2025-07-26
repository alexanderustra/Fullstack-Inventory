import { useState } from "react";
import "./App.css";
import ProductList from "./components/Product/ProductList";

function App() {
  const [filterOptions, setFilterOptions] = useState({
  sortBy: null as null | 'id' | 'cost' | 'price' | 'quantity',
  sortOrder: 'asc' as 'asc' | 'desc',
  status: 'all' as 'all' | 'active' | 'inactive',
  category: 'all',
});


  const [searchedContent, setSearchedContent] = useState("");

  const toggleSort = (field: "id" | "cost" | "price") => {
    setFilterOptions((prev) => ({
      ...prev,
      sortBy: field,
      sortOrder:
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc",
    }));
  };

  const cycleStatus = () => {
    setFilterOptions((prev) => {
      const next =
        prev.status === "all"
          ? "active"
          : prev.status === "active"
          ? "inactive"
          : "all";
      return { ...prev, status: next };
    });
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOptions((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedContent(e.target.value);
  };

  return (
    <>
      <h1>Ironmongery</h1>
      <input type="text" onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      <nav>
        <div>empty</div>
        <h2 onClick={() => toggleSort("id")}>ID</h2>
        <h2 onClick={() => toggleSort("name")}>Name</h2>
        <h2>
          Category
          <select
            onChange={handleCategorySelect}
            value={filterOptions.category}
          >
            <option value="all">All</option>
            <option value="Tools">Tools</option>
            <option value="Materials">Materials</option>
            <option value="Paint">Paint</option>
            <option value="Electricity">Electricity</option>
            <option value="Plumbing">Plumbing</option>
          </select>
        </h2>
        <h2 onClick={() => toggleSort('quantity')}>Quantity</h2>
        <h2 onClick={() => toggleSort("cost")}>Cost</h2>
        <h2 onClick={() => toggleSort("price")}>Price</h2>
        <h2 onClick={cycleStatus}>State: {filterOptions.status}</h2>
      </nav>

      <ProductList search={searchedContent} filterOptions={filterOptions} />
    </>
  );
}

export default App;
