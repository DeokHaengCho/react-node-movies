import React from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import MovieDetail from './components/views/MovieDetail/MovieDetail'

function App() {
  return (
  <Router>
    <div>
      <hr/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/movie/:movieId" component={MovieDetail}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
