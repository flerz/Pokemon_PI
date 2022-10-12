import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
	return (
		<div class="background">
			<div class="title">
                <h1>Welcome to your Henry Pokedex!!</h1>
                <h4>Please pulse the "ENTER" button to start...</h4>
                <Link to="/home">
					<button class="title" type="submit">
						ENTER
					</button>
                </Link>
			</div>
		</div>
	);
}