import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
      </React.Fragment>
    </div>
  );
}

export default App;
