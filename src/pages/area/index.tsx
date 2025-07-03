import { useEffect, useMemo, useState, } from 'react';
import { PageContainer } from '../../components/PageContainer';
import './styles.css';
import { ListBooks, } from './styles';
import { Navbar } from '../../components/Navbar';
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';





export function AreaPage() {
const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ nome: string; imagem: string }[]>([]);
  const navigate = useNavigate();


    const areas = useMemo(() =>[ 
        { nome: "Ciências Biológicas", imagem: "/assets/biologia.avif" },
         { nome: "Ciências Sociais", imagem: "/assets/social.png" },
         { nome: "Filosofia", imagem: "/assets/filosofia.png" },
         { nome: "Física", imagem: "/assets/fisica.jpg" },
         { nome: "Geografia", imagem: "/assets/geografia.png" },
         { nome: "História", imagem: "/assets/historia.jpg" },
         { nome: "Letras", imagem: "/assets/letras.jpg" },
         { nome: "Matemática", imagem: "/assets/matematica.png" },
         { nome: "Pedagogia", imagem: "/assets/pedagogia.jpg" },
         { nome: "Administração", imagem: "/assets/admin.jpg" },
         { nome: "Agronomia", imagem: "/assets/agro.jpg" },
         { nome: "Ciência da Computação", imagem: "/assets/program.jpg" },
         { nome: "Ciências Contábeis", imagem: "/assets/contabeis.jpg" },
         { nome: "Ciências Econômicas", imagem: "/assets/economia.jpg" },
        { nome: "Cinema e Audiovisual", imagem: "/assets/cinema.jpg" },
        { nome: "Jornalismo", imagem: "/assets/jornal.webp" },
        { nome: "Direito", imagem: "/assets/direito.png" },
        { nome: "Engenharia Florestal", imagem: "/assets/florestal.png" },
        { nome: "Medicina", imagem: "/assets/med.png" },
       { nome: "Psicologia", imagem: "/assets/psi.jpg" },
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
        <PageContainer padding="0px">
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
