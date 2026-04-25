import { useState } from "react";
import Popup from "./Popup";
import Form from "./Form";
import { api } from "../utils/api";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard({products, setProducts}) {
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openCreateModal = () => {
    setCreateModal(true);
  }

  const closeCreateModal = () => {
    setCreateModal(false);
  }

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  const handleCreateProduct =  async (data) => {
    try {
      const newProduct = await api.createProduct(data);
        const dadoWithData = {
        _id: newProduct._id,
        ...data
      };
      setProducts(prev => [...prev, dadoWithData]);
      closeCreateModal();
    } catch(error) {
      console.error(error);
    }
  }

  const handleDeleteProduct = async () => {
     if (!selectedProduct) return;

    try {
      await api.deleteProduct(selectedProduct._id)
      setProducts(prev => prev.filter(prod => prod._id !== selectedProduct._id));
      closeDeleteModal();
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <section>
        <section className="dashboard__functions">
          <Link to="/">
            <FaArrowAltCircleLeft className="dashboard__button green-button big-font"/>
          </Link>

          <button
            onClick={openCreateModal}
            className="dashboard__button blue-button"
          >
              Adicionar Produto
          </button>
        </section>

        <table className="dashboard__table">
          <thead>
            <tr>
              <th className="dashboard__head-cell">Nome</th>
              <th className="dashboard__head-cell">Preço</th>
              <th className="dashboard__head-cell">Descrição</th>
              <th className="dashboard__head-cell">Quantidade</th>
              <th className="dashboard__head-cell"> </th>
              <th className="dashboard__head-cell"> </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product)=>(
                <tr key={product._id}>
                   <td className="dashboard__cell">{product.productName}</td>
                   <td className="dashboard__cell">{product.price}</td>
                   <td className="dashboard__cell">{product.description}</td>
                   <td className="dashboard__cell">{product.countInStock}</td>
                   <td className="dashboard__cell">
                    <button className="dashboard__table-button green-button">
                      <FaPencilAlt className="dashboard__button-icon"/>
                    </button>
                   </td>
                   <td className="dashboard__cell">
                    <button 
                      className="dashboard__table-button red-button"
                      onClick={() => openDeleteModal(product)}
                    >
                      <FaTrash className="dashboard__button-icon"/>
                    </button>
                    </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Popup isOpen={createModal} onClose={closeCreateModal}>
          <Form handleSubmitForm={handleCreateProduct}/>
        </Popup>

        <Popup isOpen={deleteModal} onClose={closeDeleteModal}>
          <form className="form">
            <legend className="form__title">Você tem certeza?</legend>

            <button 
              className="form__button green-button"
              onClick={() => handleDeleteProduct()}
            >
                Sim
            </button>

            <button 
              className="form__button red-button"
              onClick={closeDeleteModal}
            >
              Não
            </button>
          </form>
        </Popup>
    </section>
  )
}

export default Dashboard;