import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
	const [name, setName] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		setName('');
		
	}
	function handleOnChange(e){
		setName(e.target.value)
	}
	
	return (
		<div className='navBar'>
			<div className='nlanding'>
				<Link to='/'>
					<h3>Inicio</h3>
				</Link>
			</div>
			<div className='nhome'>
				<Link to='/home'>
					<h3>Home</h3>
				</Link>
			</div>
			<div className='nsearchbar'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						value={name}
						onChange={(e) => handleOnChange(e)}
						placeholder='Search pokemon...'
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
			<div className='ncreate'>
				<Link to='/create'>
					<h3>Create</h3>
				</Link>
			</div>
			<div className='nabout'>
				<Link to='/about'>
					<h3>About</h3>
				</Link>
			</div>
		</div>
	);
}

export default NavBar;
