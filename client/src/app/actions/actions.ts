import { ON_LOADS, ON_CLICKS } from './actionTypes';

export const onClicks = (_id: any, element: any) => async (dispatch: any) => {
  dispatch({
    type: ON_CLICKS,
    payload: {
      _id: _id,
      element: element,
    },
  });
};

let loadId: number = 0;

export const onLoads = (element: any) => async (dispatch: any) => {
  dispatch({
    type: ON_LOADS,
    payload: {
      _id: loadId++,
      element: element,
    },
  });
};
