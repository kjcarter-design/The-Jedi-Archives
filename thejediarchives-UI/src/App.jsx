import React from 'react';
import { DataProvider } from './DataProvider';
import AppRouter from './components/Pages/Router';
import Header from './components/Header';
export default function App() {
	return (
		<DataProvider>
			<AppRouter>
			<Header/>
			</AppRouter>
		</DataProvider>
	);
}
