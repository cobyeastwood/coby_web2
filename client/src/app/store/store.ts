import { createStore as store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

interface State {
  _id?: any,
  element?: string,
  typicode?: object
}

const initialState: State = {  
  _id: 0,
  element: '',
  typicode: {
    userId: 104,
    id: 125,
    title: "delectus aut autem",
    completed: false,
  }
};

const middleware = [thunk];

export default store(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
