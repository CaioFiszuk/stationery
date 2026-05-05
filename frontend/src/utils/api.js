import axios, { AxiosError } from "axios";

class Api {
  constructor(options) {
    this.baseURL = options.baseUrl;
    this.headers = options.headers;
  }


_handleError(error) {
  if (error.response) {
    return `Error ${error.response.status}: ${
      error.response.data?.message || JSON.stringify(error.response.data)
    }`;
  }

  if (error.request) {
    return "Sem resposta do servidor.";
  }

  return `Erro: ${error.message}`;
}

async createProduct(data) {
  const { productName, slug, description, price, category, brand, images } = data;

  if (!productName || !slug || !description || price === undefined || !category || !brand) {
    return Promise.reject("Todos os campos são obrigatórios.");
  }

  try {
    const res = await axios.post(`${this.baseURL}/products`, data);
    return res.data;
  } catch (err) {
   if (axios.isAxiosError(err)) {
      throw new Error(this._handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}

async getProducts(category) {
  try {
    const url = category
    ? `${this.baseURL}/products?category=${category}`
    : `${this.baseURL}/products`;

    const res = await axios.get(url, {
      headers: this.headers,
    });
    return res.data;

  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this._handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}

async deleteProduct(id) {
  try {
    const res = await axios.delete(`${this.baseURL}/products/${id}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this._handleError(err));
    }
    throw new Error("Erro inesperado.");
  }
}

async updateProduct(id, data) {
  const { productName, slug, description, price, category, brand, countInStock, images } = data;

  if (!id) {
    return Promise.reject("O ID é obrigatório.");
  }

  try {
    const res = await axios.patch(`${this.baseURL}/products/${id}`, data);
    return res.data;
  } catch (err) {
   if (axios.isAxiosError(err)) {
      throw new Error(this._handleError);
    }
    throw new Error("Erro inesperado.");
  }
}

}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});