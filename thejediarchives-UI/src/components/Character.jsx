import React, { useEffect, useState } from 'react';

export default function Character({ characterUrl }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(characterUrl)
      .then(response => response.json())
      .then(data => {
        setCharacter(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [characterUrl]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{character.name}</div>;
}
