import { useEffect, useState } from 'react'
import './App.css'
import Product from './components/Product/Product'
import productsData from './data/products.json'

function App() {

  const [products, setProducts] = useState(productsData);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const manageSelectedProducts = (array:string[],id:string) =>{
     if (array.includes(id)) {
    return array.filter(item => item !== id);
    } else {
      return [...array, id];
    }
  }

  const handleCheckbox = (array:string[],id:string) =>{
    setSelectedProducts(manageSelectedProducts(array,id))
  }

  useEffect (()=>{
    console.log(selectedProducts)
  },[selectedProducts])

   const handleDelete = () => {
    setProducts(prevProducts =>
      prevProducts.filter(product => !selectedProducts.includes(product.id))
    );
    setSelectedProducts([]); 
  };

  return (
    <>
    <h1>Ironmongery</h1>
    <nav>
      <h2>Name</h2>
      <h2>Category</h2>
      <h2>ID</h2>
      <h2>Cuantity</h2>
      <h2>Cost</h2>
      <h2>Price</h2>
      <h2>State</h2>
    </nav>
    <ul>
      <button onClick={handleDelete}>Delete selected</button>
      <button>edit selected</button>
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          quantity={product.quantity}
          cost={product.cost}
          price={product.price}
          status={product.status}
          onEdit={() => console.log('Edit', product.id)}
          onDelete={() => console.log('Delete', product.id)}
          onCheckbox={() => handleCheckbox(selectedProducts,product.id)}
        />
      ))}
    </ul>
    </>
  )
}

export default App