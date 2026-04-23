function Main({products}) {

  return (
    <main>
       {
         products.map((product=>(
          <div>
            <h2>{product.productName}</h2>
            <hr />
          </div>
         )))
       }
    </main>
  )
}

export default Main;
