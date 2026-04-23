import { Routes, Route } from "react-router-dom";
import Main from "./Main";
import Dashboard from "./Dashboard";
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
          element={<Main products={products}/>}
        />

        <Route 
          path="/dashboard"
          element={<Dashboard products={products} setProducts={setProducts}/>}
        />
      </Routes>
    </section>
  )
}

export default App;
