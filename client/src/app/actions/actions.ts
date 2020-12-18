import { ON_LOADS, ON_CLICKS, ON_FETCH } from './actionTypes';

const axios = require('axios').default;

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


export const onFetch = () => async (dispatch: any) => {
  try {
    const { status, data } = await axios.get('/api/v1/typicode');
    if (status === 200 && data && data.id) {
      dispatch({
        type: ON_FETCH,
        payload: data,
      })
    }
  } catch (err) {}
}