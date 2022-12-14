import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, resetAll } from '../../actions/index.js'
import Pokemons from '../Pokemons/Pokemons.jsx'
import { Filter } from '../Filter/Filter.jsx'
import { Pagination } from '../Pagination/Pagination.jsx'

import './Home.css';

export default function Home() {
	const dispatch = useDispatch();

	const filteredPokemons = useSelector((state) => state.filteredPokemons);
	const filterBy = useSelector((state) => state.filterBy);
	const orderBy = useSelector((state) => state.orderBy);
	const originFilter = useSelector((state)=> state.originFilter);
	const pokemons = useSelector((state) => state.pokemons);

	useEffect(() => {
		dispatch(resetAll());
		dispatch(getPokemons());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	
	// Filtrado y Ordenado
	let allPokemons=[];
	filterBy === 'All' && orderBy === 'Select' && originFilter === "All"
		? (allPokemons = [...pokemons])
		: (allPokemons = [...filteredPokemons]);

	// Paginacion
	function paginate(e, num) {
		e.preventDefault();
		if(typeof num === "number")
			setPage(num);
		else if(num === "-")
			setPage(page-1)
		else if(num === "+")
			setPage(page+1)

	}

	const [page, setPage] = useState(1);
	const [pokemonsPerPage] = useState(12);

	let lastCardPerPage = page * pokemonsPerPage;
	let firtsCardPerPage = lastCardPerPage - pokemonsPerPage;
	let currentPageGames = allPokemons.slice(firtsCardPerPage, lastCardPerPage);
	
	return (
		<div class='home'>
			<div class='title'>
				<Filter paginate={paginate}/>
                <Pokemons pokemons={currentPageGames}/>
                <Pagination 
				pokemonsPerPage={pokemonsPerPage}
				totalPokemons={allPokemons.length}
				paginate={paginate} page={page}/>
			</div>
		</div>
	);
}