import { useContext, useEffect, useMemo, useState, } from 'react';
import { PageContainer } from '../../components/PageContainer';
import './styles.css';
import { ThemeContext } from "../../components/ThemeContext/ThemeContext";
import { ListBooks, } from './styles';
import { Navbar } from '../../components/Navbar';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';





export function AreaPage() {
const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();


    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("useContext must be used within a ThemeProvider");
    }
    const { darkMode } = themeContext;

    const areas = useMemo(() =>[ 
        { nome: "Ciências Biológicas", imagem: "src/assets/biologia.avif" },
         { nome: "Ciências Sociais", imagem: "src/assets/social.png" },
         { nome: "Filosofia", imagem: "src/assets/filosofia.png" },
         { nome: "Física", imagem: "src/assets/fisica.jpg" },
         { nome: "Geografia", imagem: "src/assets/geografia.png" },
         { nome: "História", imagem: "src/assets/historia.jpg" },
         { nome: "Letras", imagem: "src/assets/letras.jpg" },
         { nome: "Matemática", imagem: "src/assets/matematica.png" },
         { nome: "Pedagogia", imagem: "src/assets/pedagogia.jpg" },
         { nome: "Administração", imagem: "src/assets/admin.jpg" },
         { nome: "Agronomia", imagem: "src/assets/agro.jpg" },
         { nome: "Ciência da Computação", imagem: "src/assets/program.jpg" },
         { nome: "Ciências Contábeis", imagem: "src/assets/contabeis.jpg" },
         { nome: "Ciências Econômicas", imagem: "src/assets/economia.jpg" },
        { nome: "Cinema e Audiovisual", imagem: "src/assets/cinema.jpg" },
        { nome: "Jornalismo", imagem: "src/assets/jornal.webp" },
        { nome: "Direito", imagem: "src/assets/direito.png" },
        { nome: "Engenharia Florestal", imagem: "src/assets/florestal.png" },
        { nome: "Medicina", imagem: "src/assets/med.png" },
       { nome: "Psicologia", imagem: "src/assets/psi.jpg" },
    ],[]);

 const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
    

useEffect(() => {
    if (areas && areas.length > 0) {
      const filteredResults = areas.filter((area) =>
        area.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  }, [areas, searchTerm]);

    return (
        <PageContainer padding="0px" darkMode={darkMode}>
            <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
                <Navbar />
            </div>
            <div className='title'>
                <h1>CURSOS</h1>
            </div>
            <section>
                <div  className="Search">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchInput}
                    
                 />
                 <AiOutlineSearch style={{color:"grey"}} /> 
                </div>
                
                <div className="content-1">
                    <ListBooks >
                        <section className='listagem-1'>
                            <ul className='lista'>
                                {searchResults.map((area, index) => (
                                    <li key={index} className="card">
                                        <img src={area.imagem} alt={area.nome} className='capa'/>
                                        <h2>{area.nome}</h2>
                                        <button  className='button' onClick={() => navigate(`/area/${area.nome.toLowerCase()}`)} >Ver Livros</button>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </ListBooks>
                </div>
            </section>
        </PageContainer>
    );
}
