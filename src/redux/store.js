import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ejemploReducer from './ejemploDucks';

const rootReducer = combineReducers({
	usuarios: ejemploReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
	const store = createStore( rootReducer, composeEnhancers( applyMiddleware(thunk) ));
	return store;
}