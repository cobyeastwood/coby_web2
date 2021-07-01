import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface State {
	home: boolean
	about: boolean
	posts: boolean
}

const initialState = {
	home: false,
	about: false,
	posts: false
}

var runs: number = 0

const Navbar = () => {
	const [isSelected, setSelected] = useState(initialState)

	var current: string = ''

	if (window && runs === 0) {
		current = window.location.pathname.replace('/', '')

		switch (current) {
			case 'posts':
			case 'about':
				setSelected((prevState: any) => ({
					...initialState,
					[current]: !prevState[current]
				}))
				break
			case '':
				setSelected((prevState: any) => ({
					...initialState,
					['home']: !prevState['home']
				}))
				break
			default:
				break
		}

		runs++
	}

	const onSelect = (e: any) => {
		const key = e.target.getAttribute('aria-controls') || ''

		if (key === '') return

		setSelected((prevState: any) => ({
			...initialState,
			[key]: !prevState[key]
		}))
	}

	const { home, about, posts } = isSelected

	return (
		<React.Fragment>
			<ul className='nav nav-tabs' id='myTab' role='tablist'>
				<li className='nav-item' role='presentation'>
					<Link
						to='/'
						className={`nav-link ${home ? 'active' : ''}`}
						id='home-tab'
						data-toggle='tab'
						href='#home'
						role='tab'
						aria-controls='home'
						aria-selected={home}
						onClick={onSelect}
					>
						Home
					</Link>
				</li>
				<li className='nav-item' role='presentation'>
					<Link
						to='/about'
						className={`nav-link ${about ? 'active' : ''}`}
						id='about-tab'
						data-toggle='tab'
						href='#about'
						role='tab'
						aria-controls='about'
						aria-selected={about}
						onClick={onSelect}
					>
						About
					</Link>
				</li>
				<li className='nav-item' role='presentation'>
					<Link
						to='/posts'
						className={`nav-link ${posts ? 'active' : ''}`}
						id='posts-tab'
						data-toggle='tab'
						href='#posts'
						role='tab'
						aria-controls='posts'
						aria-selected={posts}
						onClick={onSelect}
					>
						Posts
					</Link>
				</li>
			</ul>
		</React.Fragment>
	)
}

export default Navbar
