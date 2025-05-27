import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from '../pages/search';



const AppRouter: React.FC = () => (


    <Router>
        <Routes>
           <Route path="/" element={<SearchPage />} />
          
        </Routes>
    </Router>
 
  
 
 
   
);

export default AppRouter;