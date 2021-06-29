import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { Spacer, Section } from '../styles/component.styles'
import { change, events } from '../utility/analytics'
import { ON_CLICKS } from '../actions/actionTypes'

import * as backup from '../json/data.json'
import * as helm from '../json/content.json'

const axios = require('axios').default

type Events = React.MouseEvent

interface ClicksAction {
	type: string
	payload: { _id: string; element: string }
}

export const P2 = styled.p`
	margin: 2rem;
	text-align: left;
`

const Home = (props: { clicks: (e: Events) => ClicksAction }) => {
	const [typi, setTypi] = useState([backup[0]])
	const [bool, setBool] = useState(false)

	useEffect(() => {
		if (window) {
			change(window)
		}

		async function axiosGet() {
			try {
				const { status, data } = await axios.get('/api/v1/typicode')
				if (status === 200 && data && data.id) {
					setTypi([data])
				}
			} catch (e) {}
		}
		axiosGet()
	}, [typi])

	return (
		<React.Fragment>
			<Helmet>
				<meta charSet='utf-8' />
				<title>Coby Eastwood: Home</title>
				<meta name='description' content={helm.content} />
				<link rel='canonical' href='https://cobyeastwood.com/' />
			</Helmet>
			<Spacer />
			<Section>
				<h1>Home</h1>
				<br />
				<p className='text-break'>
					Use the "Test Button" to see how an asynchronous fetch is handled in
					React with useEffect hooks.
				</p>
				<br />
				<button
					type='button'
					className='btn btn-light'
					style={{ color: '#555555', borderColor: '#C4C4C4' }}
					onClick={(e) => {
						!bool ? setBool(true) : setBool(false)
						events(e)
						clicks(e)
					}}
				>
					Test Button
				</button>
				<span>
					{bool
						? typi.map((t) => (
								<P2>
									userId: {t.userId}
									<br />
									title: {t.title}
									<br />
									id: {t.id}
									<br />
									completed: {t.completed === true ? 'true' : 'false'}
									{t.id !== 104 ? (
										<React.Fragment>
											<br />
											<br />
											Still curious? Checkout the{' '}
											<a href='/api/v1/typicode'>route</a>.
										</React.Fragment>
									) : null}
								</P2>
						  ))
						: null}
				</span>
				<br />
				<button type='button' className='btn btn-link'>
					<a href='https://github.com/cobyeastwood/coby_web2'>Source code</a>
				</button>
			</Section>
			<Section>
				<h1>Work Experience</h1>
				<br />
				<h5>
					<strong>Stratus Data Systems</strong>
				</h5>
				<h6>January 2020 - Present // Software Developer</h6>
				<p>
					As a Software Developer, I create scalable web components and backend
					features for real estate platforms running on Stratus MLS including
					<a href='https://gobii.com/'>Gobii</a>, and others. In this position,
					work with React, Redux, Node, and MongoDB. In this position, I
					sometimes work on DevOps tasks and ETL tools using nifty Python
					packages like Asyncio, and Aiohttp.
				</p>
			</Section>
			<Section>
				<h5>
					<strong>Crosspoint Evaluations</strong>
				</h5>
				<h6>June 2019 - January 2020 // Marketing Operations Manager</h6>
				<p>
					As a Marketing Operations Manager, I led and enabled a team of three
					sales associates, managed our sales pipeline using CRM, communicated
					directly with our clients, and promoted our services through direct
					marketing channels leading to 36% revenue growth.
				</p>
				<p>
					In this position, I worked with tools such as Google Analytics, Google
					Search Console, MailChimp, and CRMs. I also developed introductory
					programming skills while improving SEO and working with our Wordpress
					site in HTML5 and CSS3.
				</p>
			</Section>
			<Section>
				<h5>
					<strong>Table Public Relations</strong>
				</h5>
				<h6>June 2018 - January 2019 // Associate</h6>
				<p>
					As an Associate, I worked closely with my account managers, CEOs, and
					marketing teams of venture-backed technology startups to research,
					brainstorm, strategize and construct communication campaigns.
				</p>
				<p>
					On the job, I conducted keyword analysis, researched media trends, and
					crafted communication campaigns. I also was responsible for making
					executive profiles, and proposals of work. While working at Table, I
					refined my skills in copywriting and email marketing.
				</p>
			</Section>
			<Section>
				<h5>
					<strong>Pantry Fuel</strong>
				</h5>
				<h6>Septemper 2017 - January 2018 // Growth Marketing Intern</h6>
				<p>
					As a Growth Marketing Intern, I worked closely with the Pantry Fuel
					founder to improve sales and retention rates. In my role, I attended
					local marketing events, met with small businesses to promote our
					services, crafted blogs and ran our social media accounts.
				</p>
			</Section>
		</React.Fragment>
	)
}

const clicks = (e: Events) => ({
	type: ON_CLICKS,
	payload: { _id: uuidv4(), element: e.type }
})

const mapDispatchToProps = (
	dipatch: (arg0: {
		type: string
		payload: { _id: string; element: string }
	}) => ClicksAction
) => {
	return {
		clicks: (e: Events) => dipatch(clicks(e))
	}
}

export default connect(null, mapDispatchToProps)(Home)
