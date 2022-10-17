import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import PokemonDetail from './components/PokemonDetails/PokemonDetail.jsx';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/pokemon/:id" render={({match}) => <PokemonDetail id={match.params.id} />}
        />
      </React.Fragment>
    </div>
  );
}

export default App;
