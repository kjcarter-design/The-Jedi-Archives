const express = require('express');
const axios = require('axios');
const { toRoman } = require('../helpers/toRoman');
const { fetchFilm } = require('../helpers/fetchFilm');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const response = await axios.get('https://swapi.dev/api/films/');
		const filmsData = response.data.results;

		const filmsWithOmdbData = await Promise.all(
			filmsData.map(async (filmData) => {
				const formattedTitle = `Star Wars: Episode ${toRoman(
					filmData.episode_id
				)} - ${filmData.title}`;
				const omdbResponse = await axios.get(
					`http://www.omdbapi.com/?t=${encodeURIComponent(
						formattedTitle
					)}&apikey=ab4c990`
				);
				return { ...filmData, ...omdbResponse.data };
			})
		);

		res.send(filmsWithOmdbData);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ error: 'An error occurred while trying to fetch films' });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const swapiResponse = await axios.get(
			`https://swapi.dev/api/films/${req.params.id}/`
		);
		const swapiData = swapiResponse.data;

		const characterResponses = await Promise.all(
			swapiData.characters.map((url) => axios.get(url))
		);
		const characterData = characterResponses.map((response) => response.data);

		const filmData = { ...swapiData, characters: characterData };

		res.send(filmData);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.send({ error: 'An error occurred while trying to fetch film' });
	}
});

module.exports = router;
