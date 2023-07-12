import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landingPage';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>

      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
