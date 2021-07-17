import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';
import { useCountryStore } from './store/country-store';

export default function App() {
  const countryNames = useCountryStore((state) => state.countryNames);

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
