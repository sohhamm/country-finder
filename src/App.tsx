import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/:slug">
          <CountryDetails />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
