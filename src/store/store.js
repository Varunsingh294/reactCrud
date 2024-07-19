import { createStore } from 'redux';
import providerReducer from '../reducers/crudReducers';

const store = createStore(providerReducer);

export default store;
