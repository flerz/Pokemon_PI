import React from 'react';
import reactlogo from './images/react.svg';
import reduxlogo from './images/redux.svg';
import postgrelogo from './images/postgresql.svg';
import sequelizelogo from './images/sequelize.png';
import expresslogo from './images/express.png';
import './About.css';

function About() {
	return (
		<div className='about'>
			<h1>About This Pokedex!</h1>
			<div>
				<h4>
					This project use information and images from the{' '}
					{<a href='https://pokeapi.co/'>POKEAPI</a>} API.
				</h4>
				<h4>
					Developed by Luis Felipe Perez Villada for individual project for Henry
					Bootcamp.
				</h4>
			</div>
			<div className='logos'>
				<img className='img1' src={reactlogo} alt='Link caido' />
				<img className='img' src={reduxlogo} alt='Link caido' />
				<img className='img' src={expresslogo} alt='Link caido' />
				<img className='img' src={postgrelogo} alt='Link caido' />
				<img className='img' src={sequelizelogo} alt='Link caido' />
			</div>
		</div>
	);
}

export default About;
