import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useParams } from "react-router-dom";

function ProductView() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  const getProduct = async () => {
    try {
      const response = await api.getOneProduct(productId);
      setProduct(response);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    getProduct();
  }, []);

  return (
    <section>
        {
        product && 
          <section className="productView">
            <h2 className="productView__title">{product.productName}</h2>
            <img src={product.images} alt={product.slug} className="productView__image"/>
            <p className="productView__description">{product.description}</p>
            <span className="productView__description">Em estoque: {product.counInStock}</span>
            <span className="productView__description"><strong>Preço: R$ {product.price.toFixed(2)}</strong></span>
            <span className="productView__description"><em>{product.brand}</em></span>
          </section>
        }
    </section>
  )
}

export default ProductView;