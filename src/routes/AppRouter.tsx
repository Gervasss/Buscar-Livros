import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AreaPage } from '../pages/area';



const AppRouter: React.FC = () => (


    <Router>
        <Routes>
           <Route path="/" element={<AreaPage />} />
          
        </Routes>
    </Router>
 
  
 
 
   
);

export default AppRouter;