import { useState } from "react";
import Popup from "./Popup";
import Form from "./Form";
import { api } from "../utils/api";
import { FaTrash } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

function Dashboard({products, setProducts}) {
  const [createModal, setCreateModal] = useState(false);

  const openCreateModal = () => {
    setCreateModal(true);
  }

  const closeCreateModal = () => {
    setCreateModal(false);
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

  return (
    <section>
        <button 
          onClick={openCreateModal}
          className="dashboard__button blue-button"
        >
            Adicionar Produto
        </button>

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
                    <button className="dashboard__table-button red-button">
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
    </section>
  )
}

export default Dashboard;