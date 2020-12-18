import * as ActionTypes from '../actions/actionTypes';

const initialState = {};

export default function (state: any, action: any) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.ON_CLICKS: {
      return {
        ...state,
        ...payload,
      };
    }
    case ActionTypes.ON_LOADS: {
      return {
        ...state,
        ...payload,
      };
    }
    case ActionTypes.ON_FETCH: {
      console.log(payload)
      const {userId, id, title, completed} = payload;
      return {
        ...state,
        typicode: {
          userId,
          id,
          title,
          completed
        }
      }
    }
    default:
      return state;
  }
}
