import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AreaPage } from '../pages/area';
import { DetalhePage } from '../pages/area/detalhe';



const AppRouter: React.FC = () => (


    <Router>
        <Routes>
           <Route path="/" element={<AreaPage />} />
            <Route path="/area/:nomeMateria" element={<DetalhePage />} />
          
        </Routes>
    </Router>
 
  
 
 
   
);

export default AppRouter;