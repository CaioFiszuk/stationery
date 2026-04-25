import { useState } from "react";

function Form({handleSubmitForm}) {
    const [productName, setProductName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState("");

    const handleSubmit =  async (e) => {
     e.preventDefault();

     await handleSubmitForm({productName, slug, description, price, category, brand, images});
    
    };

  return (
    <form onSubmit={handleSubmit} className="form">
      <legend className="form__title">Adicionar Produto</legend>
       <input 
          type="text" 
          placeholder="Nome do produto"
          className="form__input"
          name='productName'
          value={productName} 
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          required
        />

        <input 
          type="text" 
          placeholder="Slug"
          className="form__input"
          name='slug'
          value={slug} 
          onChange={(e) => {
            setSlug(e.target.value);
         }}
          required
        />

        <input 
           type="text" 
           placeholder="Descrição"
           className="form__input"
           name='description'
           value={description} 
           onChange={(e) => {
            setDescription(e.target.value);
           }}
           required
        />

        <input 
           type="number" 
           placeholder="Preço"
           className="form__input"
           name='price'
           value={price} 
           onChange={(e) => {
            setPrice(Number(e.target.value));
          }}
           required
        />

        <select
          value={category}
          className="form__input"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
            <option value="">Escolha a categoria</option>
            <option value="writing">Escrita</option>
            <option value="notebooks-and-pads">Cadernos</option>
            <option value="school-supplies">Escolar</option>
            <option value="art-and-drawing">Arte e desenho</option>
            <option value="organization">Organização</option>
            <option value="accessories">Acessórios</option>
            <option value="gifts">Presentes</option>
        </select>

        <input 
           type="text" 
           placeholder="Marca"
           className="form__input"
           name='brand'
           value={brand} 
           onChange={(e) => {
            setBrand(e.target.value);
          }}
           required
        />

        <input 
          type="text"
          placeholder="Imagem"
          className="form__input"
          name='images'
          value={images} 
          onChange={(e) => {
            setImages(e.target.value);
          }}
          required
        />

        <button 
          type="submit"
          className="form__button"
        >
          Adicionar
        </button>
    </form>
  )
}

export default Form;
