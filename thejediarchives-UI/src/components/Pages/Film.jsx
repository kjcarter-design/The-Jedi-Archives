import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Film() {
	const location = useLocation();
	const filmData = location.state.filmData;
	const { Title, Released, Director, Poster } = filmData;

	const [updatedFilmData, setUpdatedFilmData] = useState(null);
	useEffect(() => {
		const fetchUpdatedFilmData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/films/${filmData.episode_id}`
				);
				setUpdatedFilmData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUpdatedFilmData();
	}, [filmData.episode_id]);

	if (!updatedFilmData)
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

	return (
		<div>
			<h1>{Title}</h1>
			<img src={Poster} alt={Title} />
			<p>Release: {Released}</p>
			<p>Director: {Director}</p>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
				>
					<Typography>Characters</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TableContainer component={Paper}>
						<Table aria-label='simple table'>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell align='right'>Height</TableCell>
									<TableCell align='right'>Mass</TableCell>
									<TableCell align='right'>Hair Color</TableCell>
									<TableCell align='right'>Skin Color</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{updatedFilmData.characters.map((character) => (
									<TableRow key={character.name}>
										<TableCell component='th' scope='row'>
											{character.name}
										</TableCell>
										<TableCell align='right'>{character.height}</TableCell>
										<TableCell align='right'>{character.mass}</TableCell>
										<TableCell align='right'>{character.hair_color}</TableCell>
										<TableCell align='right'>{character.skin_color}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
