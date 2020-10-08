import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  _id: null,
};

export default function (state = initialState, action: any) {
  const { _id, element } = action.payload;

  switch (action.type) {
    case ActionTypes.ON_CLICKS: {
      return {
        _id: _id,
        element: element,
        ...state,
      };
    }
    case ActionTypes.ON_LOADS: {
      return {
        _id: _id,
        element: element,
        ...state,
      };
    }
    default:
      return state;
  }
}
