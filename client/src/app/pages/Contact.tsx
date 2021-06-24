import React from 'react'
import { Helmet } from 'react-helmet'

import { Head, Section } from '../styles/component.styles'
import { change } from '../utility/analytics'
import * as helm from '../json/content.json'

class Contact extends React.Component<{ data: { message: string } }, {}> {
	componentDidMount() {
		if (window) {
			change(window)
		}
	}
	render() {
		return (
			<React.Fragment>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Coby Eastwood: Contact</title>
					<meta name='description' content={helm.content} />
					<link rel='canonical' href='https://cobyeastwood.com/contact'></link>
				</Helmet>
				<Head />
				<Section>
					<h1>Contact</h1>
					<br />
					<p>
						Thanks for stopping by! If you have some extra time, checkout some
						of my projects on GitHub — <strong>cobyeastwood</strong>. If you are
						trying to get a hold of me, feel free to shoot me an email to{' '}
						<strong>cobyeastwood-&#64;-gmail.com</strong>.
					</p>
				</Section>
			</React.Fragment>
		)
	}
}

export default Contact
