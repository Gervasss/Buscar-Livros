import React from 'react';
import AppRouter from './routes/AppRouter';
import './App.css';
import { ThemeProvider } from "./components/ThemeContext/ThemeContext"

const App: React.FC = () => (


<ThemeProvider>
   {/* Envolvendo o app inteiro com o ThemeProvider */}

    <div className="App">
        <AppRouter />
    </div>
  </ThemeProvider>
  

  
);

export default App;