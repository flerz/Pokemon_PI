import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPokemon, getTypes, searchPokemons } from '../../actions/index.js';
import './CreatePokemon.css';

let aux= false

function containsNumbers(str) {
	return /[0-9]/.test(str);
  }

  function resetCheckbox(){
		let checks = document.getElementsByName('ptypes')
		checks.forEach(c=>c.checked=false)
  }
export default function Create() {
	const dispatch = useDispatch();
	const types = useSelector((store) => store.types);
	const types1 = types.slice(0, 10);
	const types2 = types.slice(10, 20);
	const searchPokemon = useSelector((store)=> store.searchPokemonByName)

	

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
		ptypes:[],
	});

	useEffect(() => {
		dispatch(getTypes());
		dispatch(searchPokemons(pokemon.name.toLowerCase()))
	}, [pokemon.name]); // eslint-disable-line react-hooks/exhaustive-deps

	const ChangeInput = (e) => {
		console.log(aux);
		if (e.target.name === 'ptypes') {
			const arr = pokemon[e.target.name];
			aux=true
			setPokemon({
				...pokemon,
				[e.target.name]: arr.concat({id:e.target.id, name:e.target.value}),
			});
			console.log(aux);
		} else {
			setPokemon({
				...pokemon,
				[e.target.name]: e.target.value,
				ptypes:[],
			});
		}
	};

	const handleSubmit = (e) => {
		if(searchPokemon){
			alert("There is already a pokemon with name "+pokemon.name)
		}
		else{
		e.preventDefault();
		const obj = {
			name: pokemon.name,
			hp: pokemon.hp,
			attack: pokemon.attack,
			defense: pokemon.defense,
			speed: pokemon.speed,
			height: pokemon.height,
			weight: pokemon.weight,
            img_front: pokemon.img_front,
            img_back: pokemon.img_back,
            ptypes: pokemon.ptypes,

		};

		// Validaciones
		if (!obj.name) {
			alert('The name is missing');
			resetCheckbox()
			return;
		}
		if (containsNumbers(obj.name)) {
			alert("The name must not containt numbers.");
			resetCheckbox()
			return;
		}
		if (obj.hp < 1 || obj.hp >260 ) {
			alert('The hp must be beetwen 1 and 260.');
			resetCheckbox()
			return;
		}
        if (obj.attack < 1 || obj.attack >195) {
			alert('The attack must be beetwen 1 and 195.');
			resetCheckbox()
			return;
		}
		if (obj.defense < 1 || obj.defense >235) {
			alert('The defense must be beetwen 1 and 235.');
			resetCheckbox()
			return;
		}
        if (obj.speed < 1 || obj.speed > 185) {
			alert('The speed must be beetwen 1 and 185.');
			resetCheckbox()
			return;
		}
		if (obj.height <= 0 || obj.height > 100 ) {
			alert('The heigth must be beetwen 1 and 100.');
			resetCheckbox()
			return;
		}
        if (obj.weight <= 0 || obj.weight > 100) {
			alert('The weigth must be beetwen 1 and 100.');
			resetCheckbox()
			return;
		}
		if(!obj.ptypes.length){
			alert('At least one type must be selected');
			resetCheckbox()
			return;
		}
		if(!obj.img_front){
			alert('There must be atleast the front image');
			resetCheckbox()
			return;
		}

		dispatch(createPokemon(obj));
		e.target.reset();
		alert('Pokemon added successfully!');
		/* dispatch(getVideogames()) */
	}
	
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
            ptypes:[],			
		});
		aux=false
		let checks = document.getElementsByName('ptypes')
		checks.forEach(c=>c.checked=false)
	
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
								{searchPokemon.hasOwnProperty("name")?<span className="warning">Pokemon already exist</span>:<></>}
								<input
									className='label'
									type='text'
									name='name'
									value={pokemon.name}
								></input>
							</div>
							<div>
								<label>-hp-</label>
								{(pokemon.hp<1||pokemon.hp>260)&& pokemon.hp!==''?<span className="warning">Invalid HP</span>:<></>}
								<input
									className='label'
									type='number'
									name='hp'
									value={pokemon.hp}
								></input>
							</div>
							<div>
								<label>-Attack-</label>
								{(pokemon.attack<1||pokemon.attack>195)&& pokemon.attack!==''?<span className="warning">Invalid Attack</span>:<></>}
								<input
									className='label'
									type='number'
									name='attack'
									value={pokemon.attack}
								></input>
							</div>
							<div>
								<label>-Defense-</label>
								{(pokemon.defense<1||pokemon.defense>235)&& pokemon.defense!==''?<span className="warning">Invalid Defense</span>:<></>}
								<input
									className='label'
									type='number'
									name='defense'
									value={pokemon.defense}
								></input>
							</div>
						</div>
						<div className='divTitles'>
                            <div>
								<label>-Speed-</label>
								{(pokemon.speed<1||pokemon.speed>185)&& pokemon.speed!==''?<span className="warning">Invalid Speed</span>:<></>}
								<input
									className='label'
									type='number'
									name='speed'
									value={pokemon.speed}
								></input>
							</div>
                            <div>
								<label>-Height-</label>
								{(pokemon.height<=0||pokemon.height>100)&& pokemon.height!==''?<span className="warning">Invalid Height</span>:<></>}
								<input
									className='label'
									type='number'
									name='height'
									value={pokemon.height}
								></input>
							</div>
                            <div>
								<label>-Weight-</label>
								{(pokemon.weight<=0||pokemon.weight>100) && pokemon.weight!==''?<span className="warning">Invalid Weight</span>:<></>}
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
							{pokemon.img_front==="" && aux?<span className="warning url">Invalid image</span>:<></>}
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
												name='ptypes'
												value={gen.name}
											></input>
											<label name={gen}>{gen.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					<button className='cbutton' type='submit'>
						ADD!
					</button>
				</div>
			</form>
		</div>
	);
}
