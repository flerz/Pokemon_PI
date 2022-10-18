import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	getTypes,
	filterByType,
	orderByCreator,
	orderAsc,
	orderDesc,
	resetFilterOrder,
	resetFilterOrigin
} from '../../actions/index';
import './Filter.css';

export function Filter({ paginate }) {
	const dispatch = useDispatch();
	const types = useSelector((store) => store.types);

	useEffect(() => {
		dispatch(getTypes());
	}, []);// eslint-disable-next-line

	// Filtrado por type
	const handleFilter = (e) => {
		dispatch(filterByType(e.target.value));
		paginate(e, 1);
	};

	// Ordenado
	const handleOrder = (e) => {
		if (e.target.value === 'asc_name' || e.target.value === 'asc_attack') {
			dispatch(orderAsc(e.target.value));
		} else if (
			e.target.value === 'desc_name' ||
			e.target.value === 'desc_attack'
		) {
			dispatch(orderDesc(e.target.value));
		} else {
			dispatch(resetFilterOrder(e.target.value));
		}
	};
	console.log(types);
	// Filtrado por API/DB
	const handleCreator = (e) => {
		if (e.target.value === 'API' || e.target.value === 'DB') {
			dispatch(orderByCreator(e.target.value));
			paginate(e, 1);
		} else {
			dispatch(resetFilterOrigin());
			paginate(e, 1);
		}
	};

	return (
		<div className='filter'>
			<div>
				<div>Filtrado por Tipos</div>
				<select onChange={(e) => handleFilter(e)}>
					<option default>All</option>
					{types?types.map((G) => (
						<option value={G.name} key={G.id}>{G.name}</option>
					)):null
					}
				</select>
			</div>
			<div>
				<div>Ordenamiento</div>
				<select onChange={(e) => handleOrder(e)}>
					<option  default>
						Select
					</option>
					<option value='asc_name'>Alphabetically (A-Z)</option>
					<option value='desc_name'>Alphabetically (Z-A)</option>
					<option value='asc_attack'>Attack (Lower-Higher)</option>
					<option value='desc_attack'>Attack (Higher-Lower)</option>
				</select>
			</div>
			<div>
				<div>filtrado Api / Db</div>
				<select onChange={(e) => handleCreator(e)}>
					<option default>All</option>
					<option value='API'>API Pokemons</option>
					<option value='DB'>DB Pokemons</option>
				</select>
			</div>
		</div>
	);
}

export default Filter;
