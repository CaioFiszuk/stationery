function Main({products}) {

  return (
    <main className="main">
       {
         products.map((product=>(
          <section className="main__item">
            <h2>{product.productName}</h2>
            <img src={product.images} alt={product.slug} className="main__item-image"/>
            <span><strong>Preço: R$ {product.price.toFixed(2)}</strong></span>
            <button className="main__item-button">Adicionar ao carrinho</button>
          </section>
         )))
       }
    </main>
  )
}

export default Main;
