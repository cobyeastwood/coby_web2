import { createStore as store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const initialState: any = {
  _id: null,
  element: '',
};

const middleware = [thunk];

export default store(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
