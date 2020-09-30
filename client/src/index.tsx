import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';

import AsyncAxios from './utility/AsyncAxios';

import App from './components/App';
import Home from './components/Home';
import NotFound from './components/NotFound';

import * as serviceWorker from './serviceWorker';

const AsyncApp = AsyncAxios(App, 'http://localhost:8080/api/ping');
const AsyncHome = AsyncAxios(Home, 'http://localhost:8080/api/pong');

ReactDOM.render(
  <Router>
    <Link to="/">app</Link>
    <Link to="/home">home</Link>
    <Switch>
      <Route exact path="/" component={AsyncApp} />
      <Route exact path="/home" component={AsyncHome} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
