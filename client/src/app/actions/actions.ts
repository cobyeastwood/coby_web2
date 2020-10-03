import Action from './actionInterface';
import { ON_LOADS, ON_CLICK } from './actionTypes';

let clickId: number = 0;

export const onClick = (element: object): Action => ({
  type: ON_CLICK,
  payload: {
    _id: clickId++,
    ...element,
  },
});

export const onLoads = (element: object): Action => ({
  type: ON_LOADS,
  payload: {
    ...element,
  },
});
