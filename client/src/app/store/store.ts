import { createStore as store } from 'redux';
import rootReducer from '../reducers';

export default store(rootReducer);
