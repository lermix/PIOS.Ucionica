/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '../../Stores/rootReducer';
import frontendSettings from '../frontendSettings';

export default function configureStore() {
    if (frontendSettings.IsProduction) return createStore(rootReducer, applyMiddleware(thunkMiddleware));
    else return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
