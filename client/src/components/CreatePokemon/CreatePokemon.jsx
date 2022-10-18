import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPokemon, getTypes } from '../../actions/index.js';
//import './Create.css';

export default function Create() {
	const dispatch = useDispatch();
	const types = useSelector((store) => store.types);
	const types1 = types.slice(0, 10);
	const types2 = types.slice(10, 20);

	const [pokemon, setPokemon] = useState({
		name: '',
		hp: '',
		attack: '',
		defense: '',
        speed:'',
		height: '',
		weight: '',
        img_front:'',
        img_back:'',
		ptypes: [],
	});

	useEffect(() => {
		dispatch(getTypes());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const ChangeInput = (e) => {
		if (e.target.name === 'ptypes') {
			const arr = pokemon[e.target.name];
			setPokemon({
				...pokemon,
				[e.target.name]: arr.concat({id:e.target.id, name:e.target.value}),
			});
		} else {
			setPokemon({
				...pokemon,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const obj = {
			name: pokemon.name,
			hp: pokemon.hp,
			attack: pokemon.attack,
			defense: pokemon.defense,
			speed: pokemon.speed,
			types: pokemon.types,
			height: pokemon.height,
			weight: pokemon.weight,
            img_front: pokemon.img_front,
            img_back: pokemon.img_back,
            ptypes: pokemon.ptypes,

		};

		// Validaciones
		if (!obj.name) {
			alert('The name is missing');
			return;
		}
		if (!obj.hp > 0) {
			alert('The hp is missing.');
			return;
		}
        if (!obj.attack) {
			alert('The attack is missing.');
			return;
		}
		if (!obj.defense) {
			alert('The defense is missing.');
			return;
		}
        if (!obj.speed) {
			alert('The speed is missing.');
			return;
		}
		if (obj.height < 0) {
			alert('The heigth must be greater than 0');
			return;
		}
        if (obj.weight < 0) {
			alert('The weigth must be greater than 0');
			return;
		}

		dispatch(createPokemon(obj));
		e.target.reset();
		alert('Pokemon added successfully!');
		/* dispatch(getVideogames()) */

		setPokemon({
			name: '',
			hp: '',
			attack: '',
			defense: '',
			speed: '',
			height:'',
            weight:'',
            img_front:'',
            img_back:'',
            ptypes: [],
			
		});
	};
    
	return (
		<div className='container'>
			<h1>YOU'RE ABOUT TO ADD A NEW POKEMON TO THE POKEDEX!</h1>
			<h3>Please fulfill the info below</h3>
			<form
				id='survey-form'
				className='form'
				noValidate
				onChange={(e) => ChangeInput(e)}
				onSubmit={(e) => handleSubmit(e)}
			>
				<div>
					<div>
						<div className='divTitles'>
							<div>
								<label>-Name-</label>
								<input
									className='label'
									type='text'
									name='name'
									value={pokemon.name}
								></input>
							</div>
							<div>
								<label>-hp-</label>
								<input
									className='label'
									type='number'
									name='hp'
									value={pokemon.hp}
								></input>
							</div>
							<div>
								<label>-Attack-</label>
								<input
									className='label'
									type='number'
									name='attack'
									value={pokemon.attack}
								></input>
							</div>
							<div>
								<label>-Defense-</label>
								<input
									className='label'
									type='number'
									name='defense'
									value={pokemon.defense}
								></input>
							</div>
                            <div>
								<label>-Speed-</label>
								<input
									className='label'
									type='number'
									name='speed'
									value={pokemon.speed}
								></input>
							</div>
                            <div>
								<label>-Height-</label>
								<input
									className='label'
									type='number'
									name='height'
									value={pokemon.height}
								></input>
							</div>
                            <div>
								<label>-Weight-</label>
								<input
									className='label'
									type='number'
									name='weight'
									value={pokemon.weight}
								></input>
							</div>
						</div>
						<div className='imagediv'>
							<label>-Image Front URL-</label>
							<input
								className='imagein'
								type='text'
								name='img_front'
								value={pokemon.img_front}
							></input>
						</div>
                        <div className='imagediv'>
							<label>-Image Back URL-</label>
							<input
								className='imagein'
								type='text'
								name='img_back'
								value={pokemon.img_back}
							></input>
						</div>
					</div>
					<div className='checkboxs'>
						<div className='checks'>
							<label>-Types-</label>
							<div className='gendivs'>
								<div>
									{types1.map((gen) => (
										<div key={gen.name}>
											<input
												type='checkbox'
												name='ptypes'
												value={gen.name}
                                                id={gen.id}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
								<div>
									{types2.map((gen) => (
										<div key={gen.name}>
											<input
												type='checkbox'
												name='types'
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<button className='button' type='submit'>
						CREAR!
					</button>
				</div>
			</form>
		</div>
	);
}
