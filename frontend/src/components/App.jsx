import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Main from "./Main";
import Dashboard from "./Dashboard";
import ProductsList from "./ProductList";
import { useEffect, useState } from "react";
import { api } from "../utils/api";

function App() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await api.getProducts();
      setProducts(res);
    }
    catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
     getProducts();
  }, []);

  return (
    <section>
      <Routes>
        <Route 
          path="/"
          element={
            <>
             <Header />
             <Main products={products}/>
             <Footer />
            </>
          }
        />

        <Route 
          path="/dashboard"
          element={<Dashboard products={products} setProducts={setProducts}/>}
        />

        <Route 
         path="/products"
         element={
         <>
          <Header />
          <ProductsList products={products}/>
          <Footer />
         </>
         }
        />
      </Routes>
    </section>
  )
}

export default App;