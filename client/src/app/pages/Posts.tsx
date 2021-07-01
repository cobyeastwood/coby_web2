import React from 'react'
import { Helmet } from 'react-helmet'

import { HStack, Box } from '@chakra-ui/react'

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
	constructor(props: any, public state: any) {
		super(props)
		this.state = {
			hover: true
		}
		this.onClickHover.bind(this)
	}

	onClickHover = () =>
		this.setState((prevState: any) => ({
			...prevState,
			['hover']: !prevState.hover
		}))

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
							<h4 style={{ textAlign: 'center' }} onClick={this.onClickHover}>
								<Box
									style={{
										cursor: 'pointer',
										display: 'block'
									}}
								>
									Writing Programs In Golang [{this.state.hover ? '-' : '+'}]
								</Box>
							</h4>
							{this.state.hover ? (
								<React.Fragment>
									<p>
										<strong
											style={{ fontSize: '30px', fontFamily: 'Georgia, serif' }}
										>
											I
										</strong>{' '}
										usually write in Node.js but have been dabbling with Go on
										my own time as an alternative for backend web development.
										After working on a side project called Obsess Overs, I
										figured I would write a short piece on some best ways or
										tips for using Go on the backend.
									</p>
									<p>Three ways to writing effective Go applications.</p>
									<p>
										(1) High-order functions for passing database connections.
										In Node.js it is in best practice to keep data outside of
										the global scope, and in the Go programming language, this
										concept is no different. One benefit of using Go is
										compartmentalizing code into different sections that achieve
										a collective operation. Utilizing a struct for holding
										memory addresses is one great way to keep code clean and
										information inside the local scope. By wrapping an HTTP
										handler in a high-order function we can provide access to
										all our database connections as a parameter to be used
										throughout our application. Check out an example here.
									</p>
									<p>(2) Using interfaces. </p>
									<p>
										(3) Dealing with Go errors. A lot of Software Developers can
										struggle with error handling and Go makes this easy. In
										Node.js we wrap often asynchronous code in a try-catch then
										a callback with two parameters an error and a result. In Go,
										we are forced to handle these errors on the spot. An
										effective way to dealing with this issue is to use named
										errors (lowercase is the convention) throughout the program
										with a descriptive message pointing to what exactly went
										wrong. This can be an error reading from a file, for example
										using the io.Reader method in Go and naming the error
										"cannot read from file" + some specifics on the file being
										called. In instances where the Reader method is called this
										new variable can now be used. Check out an example here.
									</p>{' '}
								</React.Fragment>
							) : (
								''
							)}
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
