import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Film from './Film'; // Assuming Film 
import { PAGE_PATHS } from '../../constants';

export default function AppRouter({children}) {
  return (
    <Router>
      {children}
    <Routes>
      <Route path={PAGE_PATHS.HOME} element={<Home />} />
      <Route path={PAGE_PATHS.FILM} element={<Film />} />
    </Routes>
  </Router>
  )
}
