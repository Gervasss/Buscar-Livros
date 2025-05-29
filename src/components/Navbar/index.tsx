
import './styles.css';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { FaRegMoon } from 'react-icons/fa';
import { GoSun } from 'react-icons/go';
import logouesb from "../../assets/uesb.png"
import { useNavigate } from 'react-router-dom';



export function Navbar() {
const themeContext = useContext(ThemeContext);
 const navigate = useNavigate();

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode, setDarkMode } = themeContext;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
         <div className='switch' onClick={toggleDarkMode} style={{fontSize:"25px"}}>
        {darkMode ? <FaRegMoon />:<GoSun />}
       </div>
      </div>
       
    </nav>
    

  );
}
