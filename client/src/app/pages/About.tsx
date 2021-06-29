import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import { Spacer, Section } from '../styles/component.styles'
import { change } from '../utility/analytics'

import * as helm from '../json/content.json'

const About = () => {
	useEffect(() => {
		if (window) {
			change(window)
		}
	}, [])
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
				<h1>About</h1>
				<br />
				<h5>
					<strong>My Journey</strong>
				</h5>
				<p>
					I began in San Francisco, California working with Technology startups
					in Communications and Marketing. Now, I build on the web and work as a
					remote Software Developer at{' '}
					<a href='https://stratusdata.com/'>Stratus</a>.
				</p>
			</Section>
			<Section>
				<h5>
					<strong>Myself</strong>
				</h5>
				<p>
					In my free time, I will either be running, reading psychology books or
					hanging at a coffee shop. I am personally interested in running,
					programming, reading, cryptocurrencies, stocks, border collies, and
					thai food.
				</p>
			</Section>
		</React.Fragment>
	)
}

export default About
