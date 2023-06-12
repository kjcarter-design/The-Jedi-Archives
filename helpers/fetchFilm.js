const axios = require('axios')
const { toRoman } = require('./toRoman')

const fetchFilm = async (filmData) => {
  try {
    const formattedTitle = `Star Wars: Episode ${toRoman(filmData.episode_id)} - ${filmData.title}`;
    const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(formattedTitle)}&apikey=ab4c990`);
    return { ...filmData, ...response.data };
  } catch (error) {
    console.error('An error occurred while fetching OMDB data', error);
    return filmData;
  }
}

module.exports = { fetchFilm }
