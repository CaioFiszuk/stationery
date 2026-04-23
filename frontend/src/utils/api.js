import axios, { AxiosError } from "axios";

class Api {
  constructor(options) {
    this.baseURL = options.baseUrl;
    this.headers = options.headers;
  }


  _handleError() {
    if (error.response) {
      return `Error: ${error.response.status} - ${
        error.response.data?.message || error.message
      }`;
    }
    return `Network error: ${error.message}`;
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
      throw new Error(this._handleError);
    }
    throw new Error("Erro inesperado.");
  }
}

async getProducts() {
  try {
    const res = await axios.get(`${this.baseURL}/products`, {
      headers: this.headers,
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(this.handleError(err));
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