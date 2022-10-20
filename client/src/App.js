import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import PokemonDetail from './components/PokemonDetails/PokemonDetail.jsx';
import Create from './components/CreatePokemon/CreatePokemon.jsx';
import Search from './components/Search/Search.jsx'
import NavBar from './components/NavBar/NavBar.jsx';
import About from './components/About/About.jsx';
function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={NavBar}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/pokemon/:id" component={NavBar}/>
        <Route exact path="/pokemon/:id" render={({match}) => <PokemonDetail id={match.params.id} />}
        />
        <Route path="/create" component={NavBar}/>
        <Route exact path="/create" component={Create}/>
        <Route path="/result/:name" component={NavBar}/>
        <Route exact path="/result/:name" component={Search}/>
        <Route path="/about" component={NavBar}/>
        <Route exact path={"/about"} component={About}/>
      </React.Fragment>
    </div>
  );
}

export default App;
