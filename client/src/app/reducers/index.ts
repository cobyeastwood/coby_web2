import * as ActionTypes from '../actions/actionTypes'

const initialState = {
	_id: null,
	element: ''
}

interface Action {
	type: string
	payload: Object
}

export default function (state = initialState, action: Action) {
	const { type, payload } = action

	switch (type) {
		case ActionTypes.ON_CLICKS: {
			return {
				...state,
				...payload
			}
		}
		case ActionTypes.ON_LOADS: {
			return {
				...state,
				...payload
			}
		}
		default:
			return state
	}
}
