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

			<Section style={{ marginBottom: '0rem' }}>
				<HStack>
					<i
						className={`far fa-${add.about ? 'minus' : 'plus'}-square mb-4`}
						style={{
							cursor: 'pointer',
							margin: 0,
							marginLeft: '-2.5rem',
							marginTop: '1.5rem'
						}}
						onMouseOver={MouseOver}
						onMouseOut={MouseOut}
						onClick={() => onClickAdd('about')}
					/>
					<h1 style={{ marginLeft: '1.5rem' }}>About</h1>
				</HStack>
			</Section>
			{add.about ? (
				<React.Fragment>
					<Section style={{ marginTop: '0.5rem' }}>
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
					</Section>
					<Section>
						<h5>
							<strong>Myself</strong>
						</h5>
						<p>
							In my free time, I will either be running, reading psychology
							books or hanging at a coffee shop. I am personally interested in
							running, programming, reading, cryptocurrencies, stocks, border
							collies, and thai food.
						</p>
					</Section>
				</React.Fragment>
			) : (
				''
			)}
		</React.Fragment>
	)
}

export default About
