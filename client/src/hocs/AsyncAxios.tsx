import React from 'react'

const axios = require('axios').default

interface State {
	data: Array<string>
}

export function AsyncAxios(WrappedComponent: any, url: string) {
	return class extends React.Component<{}, State> {
		constructor(props: any) {
			super(props)

			this.state = {
				data: []
			}
		}

		async componentDidMount() {
			const { data } = await axios.get(url)

			this.setState({ data: data })
		}

		render() {
			return (
				<React.Fragment>
					<WrappedComponent data={this.state.data} />
				</React.Fragment>
			)
		}
	}
}

export default AsyncAxios
