import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../../components/PageContainer';
import './styles.css';
import { ThemeContext } from "../../components/ThemeContext/ThemeContext";
import { ListBooks } from './styles';
import { Navbar } from '../../components/Navbar';
import api from '../../services/api';
import type { Livro } from '../../types/types';
import { MdFirstPage, MdLastPage } from 'react-icons/md';

export function SearchPage() {
  const [Books, setBooks] = useState<Livro[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Livro[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const BooksperPage = 20;

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;

  useEffect(() => {
    const fetchBooks = async () => {
      const cached = localStorage.getItem('booksCache');
      if (cached) {
        setBooks(JSON.parse(cached));
        return;
      }

      const areas = [
        "Ciências Biológicas",
        "Ciências Sociais",
        "Filosofia",
        "Física",
        "Geografia",
        "História",
        "Letras Modernas",
        "Letras Vernáculas",
        "Matemática",
        "Pedagogia",
        "Administração",
        "Agronomia",
        "Ciência da Computação",
        "Ciências Contábeis",
        "Ciências Econômicas",
        "Cinema e Audiovisual",
        "Comunicação Social",
        "Direito",
        "Engenharia Florestal",
        "Medicina",
        "Psicologia",
        "programção"
      ];

      let allBooks: Livro[] = [];

      for (const area of areas) {
        for (let startIndex = 0; startIndex < 100; startIndex += 40) {
          try {
            const response = await api.get(
              `/volumes?q=${encodeURIComponent(area)}&startIndex=${startIndex}&maxResults=40&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
            );

            const items = response.data.items || [];
            console.log(`Itens da API para área ${area} página ${startIndex / 40 + 1}:`, items);

            const books = items.map((item: any): Livro => {
              const info = item.volumeInfo || {};
              const identifiers = info.industryIdentifiers || [];
              const isbn10 = identifiers.find(id => id.type === 'ISBN_10')?.identifier;
              const isbn13 = identifiers.find(id => id.type === 'ISBN_13')?.identifier;

              return {
                id: item.id,
                titulo: info.title || "Sem título",
                autores: info.authors || [],
                editora: info.publisher,
                dataPublicacao: info.publishedDate,
                descricao: info.description,
                isbn10,
                isbn13,
                numeroPaginas: info.pageCount,
                categorias: info.categories,
                imagemCapa: info.imageLinks?.thumbnail,
                idioma: info.language,
                linkPreview: info.previewLink,
                tipoAcesso: mapViewability(item.accessInfo?.viewability),
              };
            });

            // Atualiza o estado incrementalmente com os novos livros
            allBooks = [...allBooks, ...books];
            setBooks([...allBooks]);  // atualiza para re-renderizar mostrando os livros já carregados

            if (items.length < 40) break; // fim dos resultados para essa área

          } catch (error) {
            console.error(`Erro ao buscar livros na área ${area}, página ${startIndex / 40 + 1}`, error);
            break;
          }
        }
      }

      localStorage.setItem('booksCache', JSON.stringify(allBooks));
    };

    fetchBooks();
  }, []);




  // Função auxiliar fora do useEffect:
  function mapViewability(viewability?: string): Livro["tipoAcesso"] {
    switch (viewability) {
      case 'ALL_PAGES':
        return 'completo';
      case 'PARTIAL':
        return 'parcial';
      case 'NO_PAGES':
        return 'nenhum';
      default:
        return 'desconhecido';
    }
  }

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (Books && Books.length > 0) {
      const filteredResults = Books.filter((livro) =>
        livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [Books, searchTerm]);


  const formatDate = (date: string) => {
    const year = new Date(date).getFullYear();
    return `${year}`;
  };

  const indexOfLastLog = currentPage * BooksperPage;
  const indexOfFirstLog = indexOfLastLog - BooksperPage;
  const isSearching = searchTerm.trim() !== '';

  const currentLogs = isSearching
    ? searchResults               
    : showAll
      ? searchResults             
      : searchResults.slice(indexOfFirstLog, indexOfLastLog);  


  const totalPages = Math.ceil(searchResults.length / BooksperPage);
  // Função para mudar a página
  const changePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);





  console.log("Livros recebidos:", Books);

  return (
    <PageContainer padding="0px" darkMode={darkMode}>
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <Navbar />
      </div>
      <div className='title'>
        <h1>LIVROS</h1>
      </div>
      <section>
        <input
          type="text"
          className="Search"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchInput}
          style={{ border: '2px solid #c0c0c0' }}
        />
        <div className="content-1">
          <ListBooks darkMode={darkMode}>
            <section className='listagem-1'>
              {searchResults.length > 0 ? (
                <ul className='lista'>
                  {currentLogs.map((livro, index) => (
                    <div key={`${livro.id}-${index}`} className='card'>
                      <div>
                        {livro.imagemCapa ? (
                          <img
                            className="poster"
                            src={livro.imagemCapa.replace('http://', 'https://')}
                            alt={livro.titulo}
                          />
                        ) : (
                          <img className="poster"
                            src='src/assets/capa.png'
                          />
                        )}
                        <h3>{livro.titulo}</h3>
                        <p>Editora: {livro.editora}</p>
                        <p>Autor(a): {livro.autores}</p>
                        <p>Categoria: {livro.categorias}</p>
                        <p> Ano de Publicação: {formatDate(livro.dataPublicacao)}</p>
                        <p>Páginas: {livro.numeroPaginas}</p>
                      </div>
                    </div>
                  ))}
                </ul>
              ) : (
                <p>Livros não encontrados</p>
              )}
              {!showAll && (
                <div className="pagination">
                  <MdFirstPage
                    onClick={() => changePage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='back'
                    size={25}
                  />
                  <span> {`Página ${currentPage} de ${totalPages}`} </span>
                  <MdLastPage
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage === totalPages}

                    className='back'
                    size={25}
                  />
                  <br></br>
                  <button onClick={() => setShowAll(true)} className='button-show-all'>Todos</button>
                </div>
              )}
            </section>
          </ListBooks>
        </div>
      </section>
    </PageContainer>
  );
}
