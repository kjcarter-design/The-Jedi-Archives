import React from 'react';
import {
	Grid,
	Container,
	Typography,
	CircularProgress,
	Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import FilmCard from '../FilmCard';

export default function Home() {
	const {
		isLoading,
		isError,
		data: films,
		error,
	} = useQuery(
		'fetchFilms',
		() => fetch(`http://localhost:5000/api/films`).then((res) => res.json()),
		{ staleTime: Infinity }
	);
	console.log(films);
	if (isLoading)
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress />
			</Box>
		);
	if (isError) return <Typography>Error: {error.message}</Typography>;

	const sortedFilms = [...films].sort((a, b) => a.episode_id - b.episode_id);

	const originalTrilogy = sortedFilms.filter(
		(film) =>
			new Date(film.release_date).getFullYear() >= 1977 &&
			new Date(film.release_date).getFullYear() <= 1983
	);
	const prequelTrilogy = sortedFilms.filter(
		(film) =>
			new Date(film.release_date).getFullYear() >= 1999 &&
			new Date(film.release_date).getFullYear() <= 2005
	);
	const sequelTrilogy = sortedFilms.filter(
		(film) =>
			new Date(film.release_date).getFullYear() >= 2015 &&
			new Date(film.release_date).getFullYear() <= 2019
	);

	console.log('Original Trilogy:', originalTrilogy);
	console.log('Prequel Trilogy:', prequelTrilogy);
	console.log('Sequel Trilogy:', sequelTrilogy);
	return (
		<Container>
			<Typography variant='h4' align='center' gutterBottom>
				Welcome to The Jedi Archives
			</Typography>
			<Typography variant='subtitle1' align='center' gutterBottom>
				Explore the history of a galaxy far far away...
			</Typography>
			<Typography variant='h5' align='center' gutterBottom>
				Original Trilogy
			</Typography>
			<Grid container spacing={3}>
				{originalTrilogy.map((film, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Link
							to={{
								pathname: `/film/${film.episode_id}`,
								state: { filmData: film },
							}}
						>
							<FilmCard filmData={film} />
						</Link>
					</Grid>
				))}
			</Grid>
			<Typography variant='h5' align='center' gutterBottom>
				Prequel Trilogy
			</Typography>
			<Grid container spacing={3}>
				{prequelTrilogy.map((film, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Link
							to={{
								pathname: `/film/${film.episode_id}`,
								state: { filmData: film },
							}}
						>
							<FilmCard filmData={film} />
						</Link>
					</Grid>
				))}
			</Grid>
			<Typography variant='h5' align='center' gutterBottom>
				Sequel Trilogy
			</Typography>
			<Grid container spacing={3}>
				{sequelTrilogy.map((film, index) => (
					<Grid item xs={12} sm={6} md={4} key={index}>
						<Link
							to={{
								pathname: `/film/${film.episode_id}`,
								state: { filmData: film },
							}}
						>
							<FilmCard filmData={film} />
						</Link>
					</Grid>
				))}
			</Grid>{' '}
		</Container>
	);
}
