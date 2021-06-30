import React from 'react'
import { Helmet } from 'react-helmet'

import { HStack } from '@chakra-ui/react'

import { Spacer, Section } from '../styles/component.styles'
import { change } from '../utility/analytics'
import * as helm from '../json/content.json'

class Posts extends React.Component<
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
					<title>Coby Eastwood: Posts</title>
					<meta name='description' content={helm.content} />
					<link rel='canonical' href='https://cobyeastwood.com/posts'></link>
				</Helmet>
				<Spacer />
				<Section>
					<HStack>
						<i
							className={`far fa-${add.posts ? 'minus' : 'plus'}-square mb-4`}
							style={{
								cursor: 'pointer',
								margin: 0,
								marginLeft: '-2.5rem',
								marginTop: '1.75rem'
							}}
							onMouseOver={MouseOver}
							onMouseOut={MouseOut}
							onClick={() => onClickAdd('posts')}
						/>
						<h2 style={{ marginLeft: '1.5rem' }}>Posts</h2>
					</HStack>
					{add.posts ? (
						<React.Fragment>
							<Section />
							<h4 style={{ textAlign: 'center' }}>Good Components</h4>
						</React.Fragment>
					) : (
						''
					)}
				</Section>
			</React.Fragment>
		)
	}
}

export default Posts
