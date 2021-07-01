import React from 'react'
import { Helmet } from 'react-helmet'

import { HStack, Box } from '@chakra-ui/react'

import {
	SmallSpacer,
	Spacer,
	Section,
	P2 as P
} from '../styles/component.styles'
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
							<SmallSpacer />
							{this.state.hover ? (
								<React.Fragment>
									<P>
										<strong
											style={{
												fontSize: '20px',
												fontFamily: 'Georgia, serif',
												margin: 0,
												padding: '-1rem'
											}}
										>
											I
										</strong>{' '}
										usually write code in Node.js but have been dabbling with Go
										for backend web development. After working on a side project
										called{' '}
										<a href='https://github.com/cobyeastwood/ObsessOvers'>
											Obsess Overs
										</a>
										, I figured I would write a short piece on some best ways or
										tips for using Go on the backend.
									</P>
									<SmallSpacer />
									<P>
										{' '}
										<em
											style={{
												fontSize: '20px',
												fontFamily: 'Georgia, serif',
												margin: 0,
												padding: '-1rem'
											}}
										>
											Three ways to writing effective Go applications.
										</em>
									</P>
									<P>
										<em
											style={{
												fontSize: '16px',
												fontFamily: 'Georgia, serif',
												margin: 0,
												padding: '-1rem'
											}}
										>
											1. Making high-order functions for passing database
											connections.
										</em>{' '}
									</P>
									<P style={{ margin: '2rem' }}>
										In Node.js it is in best practice to keep data outside of
										the global scope, and in the Go programming language, this
										concept is no different. One benefit of using Go is
										compartmentalizing code into different sections that achieve
										a collective operation. Utilizing a struct for holding
										memory addresses is one great way to keep code clean and
										information inside the local scope. By wrapping an HTTP
										handler in a high-order function we can provide access to
										all our database connections as a parameter to be used
										throughout our application.
									</P>
									<P style={{ margin: '2rem' }}>
										Check out an{' '}
										<a href='https://github.com/cobyeastwood/ObsessOvers/blob/19e16e6ad27b9f2bdeaca9fb374b83ac8cc8b1c7/api/v1.go#L25'>
											example.
										</a>
									</P>
									<P>
										{' '}
										<em
											style={{
												fontSize: '16px',
												fontFamily: 'Georgia, serif',
												margin: 0,
												padding: '-1rem'
											}}
										>
											2. Using interfaces.
										</em>{' '}
									</P>
									<P style={{ margin: '2rem' }}>
										Apart from assisting in the use of generics, interfaces can
										be used to maintain code simplicity. With interfaces, we can
										cut down functions into compact utilities that only accept
										an interface and its types. Writing good interfaces starts
										with defining a given type that encompasses programs' needs.
										For instance, an interface could be used to define a service
										— Go Docs uses a built-in File interface for the for the
										HTTP package.
									</P>
									<P style={{ margin: '2rem' }}>
										Check out the{' '}
										<a href='https://golang.org/pkg/net/http/#File'>
											File interface.
										</a>
									</P>
									<P>
										{' '}
										<em
											style={{
												fontSize: '16px',
												fontFamily: 'Georgia, serif',
												margin: 0,
												padding: '-1rem'
											}}
										>
											3. Dealing with Go errors.{' '}
										</em>{' '}
									</P>{' '}
									<P style={{ margin: '2rem' }}>
										A lot of Developers can struggle with error handling and Go
										makes this easy. In Node.js we wrap often asynchronous code
										in a try-catch then a callback with two parameters an error
										and a result. In Go, we are forced to handle these errors on
										the spot. An effective way to dealing with this issue is to
										use named errors (lowercase is the convention) throughout
										the program with a descriptive message pointing to what
										exactly went wrong. This can be an error reading from a
										file, for example using the io.Reader method in Go and
										naming the error "cannot read from file" + some specifics on
										the file being called. In instances where the Reader method
										is called this new variable can now be used.
									</P>{' '}
									<P style={{ margin: '2rem' }}>
										Check out an{' '}
										<a href='https://blog.golang.org/go1.13-errors'>example.</a>
									</P>
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
