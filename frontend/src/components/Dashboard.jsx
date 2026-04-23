import { useState } from "react";
import Popup from "./Popup";
import Form from "./Form";
import { api } from "../utils/api";

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
        <button onClick={openCreateModal}>Adicionar Produto</button>

        <Popup isOpen={createModal} onClose={closeCreateModal}>
          <Form handleSubmitForm={handleCreateProduct}/>
        </Popup>
    </section>
  )
}

export default Dashboard;