import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FilmCard({ filmData }) {
  const navigate = useNavigate();
  const [selectedFilm, setSelectedFilm] = useState(null);

  useEffect(() => {
    if (selectedFilm) {
      navigate(`/film/${selectedFilm.episode_id}`, { state: { filmData: selectedFilm }, replace: true });
    }
  }, [selectedFilm, navigate]);

  const handleClick = () => {
    setSelectedFilm(filmData);
  };

  return (
    <Card onClick={handleClick}>
      <CardMedia
        component='img'
        alt={filmData.Title}
        height='140'
        image={filmData.Poster}
        title={filmData.Title}
      />
      <CardContent>
        <Typography  gutterBottom variant='h5' component='div'>
          {filmData.Title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Release: {filmData.Released}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Director: {filmData.Director}
        </Typography>
      </CardContent>
    </Card>
  );
}
