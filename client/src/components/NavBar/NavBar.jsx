import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import './Navbar.css';

function NavBar() {
	const [name, setName] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		setName('');
	}

	return (
		<div className='navBar'>
			<div className='pokemons'>
				<Link to='/'>
					<h3>Inicio</h3>
				</Link>
			</div>
			<div className='home'>
				<Link to='/home'>
					<h3>Home</h3>
				</Link>
			</div>
			<div className='searchbar'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder='Search videogame...'
						type='text'
					></input>
					<Link to={`/result/${name}`}>
						<button name='name' type='submit'>
							{' '}
							Go!{' '}
						</button>
					</Link>
				</form>
			</div>
			<div className='create'>
				<Link to='/create'>
					<h3>Create</h3>
				</Link>
			</div>
			<div className='about'>
				<Link to='/about'>
					<h3>About</h3>
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
