import React, { useState, useEffect } from 'react'
import { Span } from '../styles/component.styles'
import { events } from '../utility/analytics'

import * as backup from '../json/data.json'
import styled from 'styled-components'

const axios = require('axios').default

const Div = styled.div`
	margin-top: 5rem;
`

const P = styled.p`
	font-size: 16px;
`

const A = styled.a`
	font-size: 16px;
`

type UserQuote = User & Quote

interface User {
	userId: number
	id: number
	title: string
	completed: boolean
}

interface Quote {
	content: string
	id: number
	language_code: string
	originator: {
		id: number
		name: string
		url: string
	}
	tags: string[]
	url: string
}

const Footer = () => {
	const [active, setActive] = useState('')
	const [quote, setQuote] = useState([backup[1]])

	useEffect(() => {
		async function axiosGet() {
			try {
				const { status, data } = await axios.get('/api/v1/quote')
				if (status === 200 && data && data.id) {
					setQuote([data])
				}
			} catch (err) {}
		}
		axiosGet()
	}, [])

	const onClickMove = (href: string) => (e: any) => {
		events(e)
		window.location.assign(href)

		if (href.includes('twitter')) {
			setActive('twitter')
		}

		if (href.includes('github')) {
			setActive('github')
		}

		if (href.includes('linkedin')) {
			setActive('linkedin')
		}
	}

	return (
		<React.Fragment>
			<Span className='mx-auto'>
				<div
					className='text-justify btn-group btn-group-toggle b-0'
					data-toggle='buttons'
					style={{ color: '#555555', borderColor: '#19BC9B' }}
				>
					<label
						className={`btn btn-light ${
							active === 'linkedin' ? 'active' : null
						}`}
						style={{ color: '#555555', borderColor: 'white' }}
						onClick={onClickMove(
							'https://www.linkedin.com/in/coby-eastwood-196b12152/'
						)}
					>
						<i className='fab fa-linkedin-in' />
					</label>
					<label
						className={`btn btn-light ${active === 'github' ? 'active' : null}`}
						style={{ color: '#555555', borderColor: 'white' }}
						onClick={onClickMove('https://github.com/cobyeastwood')}
					>
						<i className='fab fa-github' />
					</label>
					<label
						className={`btn btn-light ${
							active === 'twitter' ? 'active' : null
						}`}
						style={{ color: '#555555', borderColor: 'white' }}
						onClick={onClickMove('https://twitter.com/cobyeastwood')}
					>
						<i className='fab fa-twitter' />
					</label>
				</div>
			</Span>
			<Div
				className='card'
				style={{
					backgroundColor: '#ECF0F1',
					borderColor: 'white',
					opacity: '.8',
					marginBottom: '5rem'
				}}
			>
				<div
					className='card-header'
					style={{
						backgroundColor: '#ECF0F1',
						color: '#555555',
						borderColor: 'white'
					}}
				>
					Quote to Inspire
				</div>
				<div className='card-body'>
					<blockquote className='blockquote mb-0'>
						{quote
							? quote.map((q: any, i: number) => (
									<React.Fragment key={i++}>
										<P style={{ color: '#555555' }} key={i++}>
											<em>{q.content || ''}</em>
										</P>
										<footer
											key={i++}
											className='blockquote-footer'
											style={{ color: '#555555', opacity: '.8' }}
										>
											<cite
												key={i++}
												style={{ color: '#555555', opacity: '.8' }}
											>
												{q.originator.name ? q.originator.name : ''}
											</cite>
										</footer>
									</React.Fragment>
							  ))
							: null}
					</blockquote>
				</div>
			</Div>
		</React.Fragment>
	)
}

export default Footer
