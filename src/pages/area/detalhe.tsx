import { useParams } from 'react-router-dom';
import { PageContainer } from '../../components/PageContainer';
import { Navbar } from '../../components/Navbar';
import { ListBooks, Loader } from './styles';
import { AiOutlineSearch } from 'react-icons/ai';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../components/ThemeContext/ThemeContext';
import "./styles.css";
import "./styles";
import type { Livro } from '../../types/types';
import api from '../../services/api';
import capaPadrao from '../../assets/capa.png';


export function DetalhePage() {
  const { nomeMateria } = useParams<{ nomeMateria: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Livro[]>([]);
  const [Books, setBooks] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(false);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;


  const areaQueryMap: Record<string, string> = {
    'ciência da computação': 'Ciência da Computação OR "Programação" OR "Engenharia de Software" OR "Desenvolvimento de Software" OR "Inteligência Artificial" OR "Banco de Dados" OR "Algoritmos" OR "Estruturas de Dados" OR "Redes de Computadores" OR "Sistemas Operacionais" OR "Segurança da Informação" OR Cibersegurança OR "Tecnologia da Informação" OR "Java" OR "python"',
     agronomia: 'Agronomia OR Agricultura OR "Ciências Agrárias" OR "Engenharia Agronômica" OR Agropecuária OR "Agronegócio"',

  };





  useEffect(() => {
    if (!nomeMateria) return;

    const fetchBooks = async () => {
      setLoading(true);

      const cacheKey = `liv${nomeMateria.toLowerCase()}`;

      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          setBooks(cachedData.books);
          setLoading(false);
          return;
        } catch {
          // Cache corrompido? Ignora e busca API
        }
      }

      let allBooks: Livro[] = [];
      const query = areaQueryMap[nomeMateria.toLowerCase()] || nomeMateria;

      for (let startIndex = 0; startIndex < 300; startIndex += 40) {
        try {
          const response = await api.get(
            `/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=40&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
          );

          const items = response.data.items || [];

          const booksPage = items.map((item: any): Livro => {
            const info = item.volumeInfo || {};
            const identifiers = info.industryIdentifiers || [];
            const isbn10 = identifiers.find((id: any) => id.type === 'ISBN_10')?.identifier;
            const isbn13 = identifiers.find((id: any) => id.type === 'ISBN_13')?.identifier;

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
            };
          });

          allBooks = [...allBooks, ...booksPage];

          if (items.length < 40) break;

          await new Promise(res => setTimeout(res, 1000));
        } catch (error) {
          console.error(`Erro ao buscar livros da área Desejada, página ${startIndex / 40 + 1}`, error);
          break;
        }
      }

      setBooks(allBooks);

      try {
        localStorage.setItem(cacheKey, JSON.stringify({ books: allBooks }));
      } catch (e) {
        console.warn('Não foi possível salvar cache:', e);
      }

      setLoading(false);
    };

    fetchBooks();
  }, [nomeMateria]);


  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };




  const formatDate = (date: string) => {
    const year = new Date(date).getFullYear();
    return `${year}`;
  };





  useEffect(() => {
    if (Books && Books.length > 0) {
      const filteredResults = Books.filter((livro) =>
        livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [Books, searchTerm]);

  return (
   <PageContainer padding="0px" darkMode={darkMode}>
    <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
      <Navbar />
    </div>

    {loading ? (
    <div className="loader-container">
    <Loader className="loader" />
  </div>
    ) : (
      <>
        <div className='title'>
          <h1>{nomeMateria}</h1>
        </div>

        <section>
          <div className="Search">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleSearchInput}
            />
            <AiOutlineSearch style={{ color: "grey" }} />
          </div>

          <div className="content-1">
            <ListBooks>
              <section className='listagem-1'>
                <ul className='lista'>
                  {searchResults.length === 0 && <h2 className='not-found'>Nenhum livro encontrado !</h2>}
                  {searchResults.map((livro, index) => (
                    <li key={index} className="card">
                      {livro.imagemCapa ? (
                        <img
                          className="capa"
                          src={livro.imagemCapa.replace('http://', 'https://')}
                          alt={livro.titulo}
                        />
                      ) : (
                        <img
                          className="capa"
                          src={capaPadrao}
                          alt="Capa padrão"
                        />
                      )}
                      <h2 className='titulo-livro'>{livro.titulo}</h2>
                      <p>Editora: {livro.editora}</p>
                      <p>Autor(a): {livro.autores.join(', ')}</p>
                      <p>Categoria: {livro.categorias?.join(', ')}</p>
                      <p>Ano de Publicação: {livro.dataPublicacao ? formatDate(livro.dataPublicacao) : 'N/A'}</p>
                      <p>Páginas: {livro.numeroPaginas}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </ListBooks>
          </div>
        </section>
      </>
    )}
  </PageContainer>
);
}
