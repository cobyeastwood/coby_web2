import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './app/components/Navbar'
import Footer from './app/components/Footer'

import Home from './app/pages/Home'
import About from './app/pages/About'
import Posts from './app/pages/Posts'
import NotFound from './app/pages/NotFound'

const MainView = () => {
	const [add, setAdd] = useState({
		home: true,
		work: true,
		contact: true,
		about: true,
		posts: true
	})

	const MouseOver = (e: any) => {
		e.target.style.background = '#43C8AE'
	}

	const MouseOut = (e: any) => {
		e.target.style.background = ''
	}

	const onClickAdd = (text: any) => {
		setAdd((prevState: any) => {
			return {
				...prevState,
				[text]: !prevState[text]
			}
		})
	}

	return (
		<Router>
			<div className='container'>
				<Navbar />
				<Switch>
					<Route
						exact
						path='/'
						render={(props) => (
							<Home
								{...props}
								add={add}
								MouseOut={MouseOut}
								MouseOver={MouseOver}
								onClickAdd={(text: any) => onClickAdd(text)}
							/>
						)}
					/>
					<Route
						exact
						path='/about'
						render={(props) => (
							<About
								{...props}
								add={add}
								MouseOut={MouseOut}
								MouseOver={MouseOver}
								onClickAdd={(text: any) => onClickAdd(text)}
							/>
						)}
					/>
					<Route
						exact
						path='/posts'
						render={(props) => (
							<Posts
								{...props}
								add={add}
								MouseOut={MouseOut}
								MouseOver={MouseOver}
								onClickAdd={(text: any) => onClickAdd(text)}
							/>
						)}
					/>
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</div>
		</Router>
	)
}

export default MainView
