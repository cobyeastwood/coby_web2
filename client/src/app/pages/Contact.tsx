import React from 'react'
import { Helmet } from 'react-helmet'

import { HStack } from '@chakra-ui/react'

import { Spacer, Section } from '../styles/component.styles'
import { change } from '../utility/analytics'
import * as helm from '../json/content.json'

class Contact extends React.Component<
	{
		add: any
		MouseOver: (e: any) => void
		MouseOut: (e: any) => void
		onClickAdd: (text: any) => void
		data?: { message: string }
	},
	{}
> {
	componentDidMount() {
		if (window) {
			change(window)
		}
	}
	render() {
		const { add = {}, onClickAdd, MouseOut, MouseOver } = this.props
		return (
			<React.Fragment>
				<Helmet>
					<meta charSet='utf-8' />
					<title>Coby Eastwood: Contact</title>
					<meta name='description' content={helm.content} />
					<link rel='canonical' href='https://cobyeastwood.com/contact'></link>
				</Helmet>
				<Spacer />
				<Section>
					<HStack>
						<i
							className={`far fa-${add.home ? 'minus' : 'plus'}-square mb-4`}
							style={{
								cursor: 'pointer',
								margin: 0,
								marginLeft: '-2.5rem',
								marginTop: '1.5rem'
							}}
							onMouseOver={MouseOver}
							onMouseOut={MouseOut}
							onClick={() => onClickAdd('contact')}
						/>
						<h1 style={{ marginLeft: '1.5rem' }}>Contact</h1>
					</HStack>
					{add.contact ? (
						<React.Fragment>
							<br />
							<p>
								Thank you for stopping by! If you have some time, you can
								checkout some of my projects on GitHub —{' '}
								<strong>cobyeastwood</strong>. If you are trying to get a hold
								of me, feel free to shoot an email to{' '}
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
}

export default Contact
