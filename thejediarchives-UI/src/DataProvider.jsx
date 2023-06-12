import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFilmsAndCharacters = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/films');
        // console.log('Response data from backend:', response.data);
        setFilms(response.data.results);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFilmsAndCharacters();
  }, []);

  return (
    <DataContext.Provider value={{ films, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
