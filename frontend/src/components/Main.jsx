import { Link } from "react-router-dom";

function Main({products}) {

  const limitedProducts = products.slice(0, 5);

  return (
    <main className="main">
       {
         limitedProducts.map((product=>(
          <section className="main__item">
            <h2>{product.productName}</h2>
            <img src={product.images} alt={product.slug} className="main__item-image"/>
            <span><strong>Preço: R$ {product.price.toFixed(2)}</strong></span>
            <button className="main__item-button">Adicionar ao carrinho</button>
            <Link to={`/product/${product._id}`}>Ver Detalhes</Link>
          </section>
         )))
       }
    </main>
  )
}

export default Main;
