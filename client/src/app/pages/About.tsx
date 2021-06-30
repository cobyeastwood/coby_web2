import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { HStack } from '@chakra-ui/react'

import { Spacer, Section } from '../styles/component.styles'
import { change } from '../utility/analytics'

import * as helm from '../json/content.json'

const About = (props: {
	add: any
	MouseOver: (e: any) => void
	MouseOut: (e: any) => void
	onClickAdd: (text: any) => void
}) => {
	useEffect(() => {
		if (window) {
			change(window)
		}
	}, [])

	const { add = {}, onClickAdd, MouseOut, MouseOver } = props

	return (
		<React.Fragment>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Coby Eastwood: About</title>
				<meta name='description' content={helm.content} />
				<link rel='canonical' href='https://cobyeastwood.com/about'></link>
			</Helmet>
			<Spacer />
			<Section>
				<HStack>
					<i
						className={`far fa-${add.about ? 'minus' : 'plus'}-square mb-4`}
						style={{
							cursor: 'pointer',
							margin: 0,
							marginLeft: '-2.5rem',
							marginTop: '1.75rem'
						}}
						onMouseOver={MouseOver}
						onMouseOut={MouseOut}
						onClick={() => onClickAdd('about')}
					/>
					<h2 style={{ marginLeft: '1.5rem' }}>About</h2>
				</HStack>
				{add.about ? (
					<React.Fragment>
						<br />
						<h5>
							<strong>My Journey</strong>
						</h5>
						<p>
							I began in San Francisco, California working with Technology
							startups in Communications and Marketing. Now, I build on the web
							and work as a remote Software Developer at{' '}
							<a href='https://stratusdata.com/'>Stratus</a>.
						</p>
						<Section />
						<h5>
							<strong>Myself</strong>
						</h5>
						<p>
							In my free time, I will either be running, reading psychology
							books or hanging at a coffee shop. I am personally interested in
							running, programming, reading, cryptocurrencies, stocks, border
							collies, and thai food.
						</p>
					</React.Fragment>
				) : (
					''
				)}
			</Section>
			<Section>
				<HStack>
					<i
						className={`far fa-${add.contact ? 'minus' : 'plus'}-square mb-4`}
						style={{
							cursor: 'pointer',
							margin: 0,
							marginLeft: '-2.5rem',
							marginTop: '1.75rem'
						}}
						onMouseOver={MouseOver}
						onMouseOut={MouseOut}
						onClick={() => onClickAdd('contact')}
					/>
					<h2 style={{ marginLeft: '1.5rem' }}>Contact</h2>
				</HStack>
				{add.contact ? (
					<React.Fragment>
						<br />
						<p>
							Thank you for stopping by! If you have some time, you can checkout
							some of my projects on GitHub — <strong>cobyeastwood</strong>. If
							you are trying to get a hold of me, feel free to shoot an email to{' '}
							<strong>cobyeastwood&#64;gmail.com</strong>.
						</p>
					</React.Fragment>
				) : (
					''
				)}
			</Section>
		</React.Fragment>
	)
}

export default About
