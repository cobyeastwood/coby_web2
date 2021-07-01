import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import './index.css'

import store from './app/store/store'

import { initGA } from './app/utility/analytics'

import * as serviceWorker from './serviceWorker'

import MainView from './view'

initGA()

ReactDOM.render(
	<Provider store={store}>
		<MainView />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
