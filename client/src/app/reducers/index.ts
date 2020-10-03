import Action from '../actions/actionInterface';
import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  path: [],
  clicks: [],
};

export default function (state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.ON_CLICK: {
      const { _id, element } = action.payload;
      return {
        _id,
        ...element,
        ...state,
      };
    }
    case ActionTypes.ON_LOADS: {
      const { element } = action.payload;
      return {
        ...element,
        ...state,
      };
    }
    default:
      return state;
  }
}
