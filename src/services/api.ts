import type { AxiosResponse } from "axios";
import type { Livro } from "../types/types";
import axios from "axios";

const api = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
});

const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

// Busca livros acadêmicos paginados com startIndex
export const getAllBooks = async (startIndex: number): Promise<Livro[]> => {
  const query = "geografia OR direito OR medicina OR cinema OR computação "; // palavra-chave para livros acadêmicos

  const response: AxiosResponse<{ items: Livro[] }> = await api.get('/volumes', {
    params: {
      q: query,
      maxResults: 40,
      startIndex,
      key: apiKey,
    },
  });

  return response.data.items || [];
};

export default api;
