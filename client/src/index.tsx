import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import store from './app/store/store';

import AsyncAxios from './hocs/AsyncAxios';

import Navbar from './app/components/Navbar';

import Home from './app/pages/Home';
import About from './app/pages/About';
import Contact from './app/pages/Contact';
import NotFound from './app/pages/NotFound';

import * as serviceWorker from './serviceWorker';

const AsyncAbout = AsyncAxios(About, 'http://localhost:8080/api/ping');
const AsyncHome = AsyncAxios(Home, 'http://localhost:8080/api/pong');
const AsyncContact = AsyncAxios(Contact, 'http://localhost:8080/api/pang');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route exact path="/about" component={AsyncAbout} />
        <Route exact path="/contact" component={AsyncContact} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
