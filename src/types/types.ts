export interface Livro {
  id: string;
  titulo: string;
  autores?: string[];
  editora?: string;
  dataPublicacao?: string;
  descricao?: string;
  isbn10?: string;
  isbn13?: string;
  numeroPaginas?: number; 
  categorias?: string[];
  imagemCapa?: string;
  idioma?: string;
  linkPreview?: string;
  tipoAcesso?: 'desconhecido'; 
}
