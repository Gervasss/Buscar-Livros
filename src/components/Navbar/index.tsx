
import './styles.css';
import logouesb from "../../assets/uesbb.png"
import { useNavigate } from 'react-router-dom';



export function Navbar() {
 const navigate = useNavigate();

  return (
    <nav className="Navbar">
      
       <img
          src={logouesb}
          alt="logo uesb"
          className="navbarlogo"
          onClick={() => navigate(`/`)}
        />
      
      
      <div className="NavButtons">
         <h1 className='navtitle'>Biblioteca Virtual</h1>
       
      </div>
       
    </nav>
    

  );
}
