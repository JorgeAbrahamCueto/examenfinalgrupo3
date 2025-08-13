import { createStore } from 'redux';
import counterReducer from '../Reducers/counterReducer';
const store = createStore(counterReducer);
export default store;