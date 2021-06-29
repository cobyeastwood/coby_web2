import React from 'react'
import styled from 'styled-components'

import { P } from '../styles/component.styles'
import { change } from '../utility/analytics'

const Spacer = styled.h1`
	margin: 2.5rem;
	text-align: center;
`

class NotFound extends React.Component {
	componentDidMount() {
		if (window) {
			change(window)
		}
	}
	render() {
		return (
			<React.Fragment>
				<Spacer>404 - Not Found</Spacer>
				<P>Sorry, this page was not found.</P>
			</React.Fragment>
		)
	}
}

export default NotFound
