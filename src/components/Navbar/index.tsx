import { Link } from 'react-router-dom';
import './styles.css';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { FaRegMoon } from 'react-icons/fa';
import { GoSun } from 'react-icons/go';


export function Navbar() {
const themeContext = useContext(ThemeContext);

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
          src="src/assets/uesb.png"
          alt="logo uesb"
          className="navbarlogo"
        />
      
      <div className="NavButtons">
        <Link to="/">Livros</Link>
        <Link to="/">Área Temática</Link>
        <Link to="/">Editora</Link>
         <div className='switch' onClick={toggleDarkMode} style={{fontSize:"25px"}}>
        {darkMode ? <FaRegMoon />:<GoSun />}
       </div>
      </div>
       
    </nav>
    

  );
}
