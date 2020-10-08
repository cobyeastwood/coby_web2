import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';

import store from './app/store/store';

import Navbar from './app/components/Navbar';
import Footer from './app/components/Footer';

import Home from './app/pages/Home';
import About from './app/pages/About';
import Contact from './app/pages/Contact';
import NotFound from './app/pages/NotFound';

import { initGA } from './app/utility/analytics';

import * as serviceWorker from './serviceWorker';

initGA();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
