import * as ActionTypes from '../actions/actionTypes';

const initialState = {};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case ActionTypes.ON_CLICKS: {
      const { _id, element } = action.payload;
      return {
        _id,
        element,
        ...state,
      };
    }
    case ActionTypes.ON_LOADS: {
      const { _id, element } = action.payload;
      return {
        _id,
        element,
        ...state,
      };
    }
    default:
      return state;
  }
}
