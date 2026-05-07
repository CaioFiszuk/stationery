import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../utils/api";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const getProducts = async () => {
    const response = await api.getProducts(category);
    setProducts(response);
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    <section>
      {
         products.map((product=>(
          <section key={product._id} className="productList">
            <h2 className="productList__title">{product.productName}</h2>
            <img src={product.images} alt={product.slug} className="productList__image"/>
            <p className="productList__description">{product.description}</p>
            <span className="productList__description"><em>{product.brand}</em></span>
            <span className="productList__description"><strong>Preço: R$ {product.price.toFixed(2)}</strong></span>
            <button className="productList__button">Adicionar ao carrinho</button>
            <Link to={`/product/${product._id}`}>Ver Detalhes</Link>
          </section>
         )))
       }
    </section>
  );
}

export default ProductsList;